import express from "express"
import bodyParser from "body-parser"
import { authRouter } from "./routes/auth.js"
import { initMovies, movieRouter } from "./routes/movies.js"
import { userRouter } from "./routes/user.js"
import { mapRouter } from "./routes/map.js"

const app = express()
const port = 80

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use('/images/avatar', express.static('upload/avatar'))

initMovies()

authRouter(app)
mapRouter(app)
userRouter(app)
movieRouter(app)

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`)
    console.log(`Start server on port ${server.address().port}`)
})