import request from "request"
import { users } from "./auth.js"

const apiKey = "a7fd7151-cbf2-4f5d-ac05-603e5906fb05"
const baseUrl = "https://kinopoiskapiunofficial.tech/api/v2.2/films"

const filters = [
    {
        path: "/top",
        query: { type: "TOP_AWAIT_FILMS" },
        type: "cover",
    },
    {
        path: "/premieres",
        query: { year : 2022, month: "OCTOBER" },
        type: "new",
    },
    {
        path: "/top",
        query: { type: "TOP_250_BEST_FILMS" },
        type: "forMe",
    },
    {
        path: "/top",
        query: { type: "TOP_100_POPULAR_FILMS" },
        type: "inTrend",
    }
]

let moviesData = []

export const initMovies = () => {
    filters.forEach( filter => initMoviesTop(filter) )
}

const initMoviesTop = (filter) => {
    setTimeout(() => {
        request.get({
            url: baseUrl+filter.path,
            headers: {
                "X-API-KEY": apiKey
            },
            qs: filter.query,
            json: true,
        }, 
        (error, res, body) => {
            if (body.films || body.items){
                let films = body.films
                if (body.items) {films = body.items}
                films.forEach( movie => {
                    console.log( movie)
                    const item = {
                        "update": 0,
                        "type": filter.type,
                        "movieId": (movie.filmId)?movie.filmId:movie.kinopoiskId,
                        "name": movie.nameRu,
                        "description": "",
                        "age": "0",
                        "images": [
                            movie.posterUrl
                        ],
                        "poster": ((movie.filmId)?movie.filmId:movie.kinopoiskId)+".jpg",
                        "tags": movie.genres.map(x => {return {tagName: x.genre}})
                    }
                    moviesData.push(item)
                })
                console.log(`Movies db load: ${moviesData.length}`)
            }
        })
    }, 2000)
}

const updateMovie = (movieId, movie, callback) => {
    request.get({
        url: baseUrl+"/"+movieId,
        headers: {
            "X-API-KEY": apiKey
        },
        qs: { type: "SCREENSHOT" },
        json: true,
    }, 
    (error, resp, body) => {
        if (body.ratingAgeLimits)
            movie.age = body.ratingAgeLimits.replace(/[^0-9]/g,"")
        movie.description = body.description
        request.get({
            url: baseUrl+"/"+movieId+"/images",
            headers: {
                "X-API-KEY": apiKey
            },
            json: true,
        }, 
        (error, resp, body) => {
            if (body.items)
                movie.images = body.items.map(i => {return i.previewUrl})
                movie.update = 1
                console.log(`Movie update: ${movieId}`)
                callback()
        })
    })

}
    
export const movieRouter = (app) => {

    app.get("/movies/cover", (req, res) => {
        const covers = moviesData.filter(x => x.type == "cover")
        const coverSelect = Math.floor(Math.random() * covers.length)
        res.status(200).send({
            movieId: covers[coverSelect].movieId,
            backgroundImage: covers[coverSelect].poster,
            foregroundImage: covers[coverSelect].poster
          })
    })

    app.get("/movies", (req, res) => {
        const movies = moviesData.filter(x => x.type == req.query.filter)
        if (movies.length > 20) movies.length = 20
        res.status(200).send(movies)
    })

    app.get("/usermovies", (req, res) => {
        let token = req.headers.authorization
        if (token){
            token = token.replace(/[^0-9]/g,"")
            const user = users.find(x => x.token == token)
            if (user){
                if (Array.isArray(user.lastView)){
                    res.status(200).send(user.lastView.map(i => {return moviesData.find(x => x.movieId == i)}))
                }else{
                    res.status(200).send([])
                }
                return
            }
        }
        res.status(401).send("Не авторизован!")
    })

    app.get("/movies/:movieId", (req, res) => {
        const movieId = req.params.movieId
        if (movieId){
            const movie = moviesData.find(x => x.movieId == movieId)
            if (movie.update == 0){
                updateMovie(movieId, movie, () => res.status(200).send(movie))
            }else{
                res.status(200).send(movie)
            }
            let token = req.headers.authorization
            console.log(users)
            if (token){
                token = token.replace(/[^0-9]/g,"")
                const user = users.find(x => x.token == token)
                if (user){
                    if (user.lastView){
                        user.lastView = user.lastView.filter(i => !(i == movieId))
                        user.lastView.unshift(movieId)
                    }else{
                        user.lastView = [movieId]
                    }
                }
            }
        }
    })

}
