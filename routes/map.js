let lastMovieHouseId = 1

let moviehouse = [
    {
        id: lastMovieHouseId++,
        name: "Химик",
        category: "Химик",
        open: "08:00",
        close: "21:45",
        latitude: "56.122800",
        longitude: "47.490549"
    },
    {
        id: lastMovieHouseId++,
        name: "КиноRooms",
        category: "Антикафе",
        open: "14:00",
        close: "02:00",
        latitude: "56.110722",
        longitude: "47.314708"
    },
    {
        id: lastMovieHouseId++,
        name: "Три пингвина",
        category: "Кинотеатр",
        open: "10:00",
        close: "00:00",
        latitude: "56.107564",
        longitude: "47.280966"
    },
    {
        id: lastMovieHouseId++,
        name: "Синема 5",
        category: "Кинотеатр",
        open: "10:00",
        close: "00:00",
        latitude: "56.102015",
        longitude: "47.265571"
    },
    {
        id: lastMovieHouseId++,
        name: "Киногалактика",
        category: "Кинотеатр",
        open: "10:00",
        close: "00:00",
        latitude: "56.135519",
        longitude: "47.240613"
    },
    {
        id: lastMovieHouseId++,
        name: "The Oscars Cinema",
        category: "Кинотеатр, Антикафе",
        open: "17:00",
        close: "01:00",
        latitude: "56.142070",
        longitude: "47.248570"
    },
    {
        id: lastMovieHouseId++,
        name: "Чувашский государственный театр юного зрителя имени М. Сеспеля",
        category: "Театр, Кинотеатр",
        open: "09:00",
        close: "19:00",
        latitude: "56.142445",
        longitude: "47.205624"
    },
    {
        id: lastMovieHouseId++,
        name: "Чебоксары театр оперы",
        category: "Театр, Кинотеатр",
        open: "11:00",
        close: "19:00",
        latitude: "56.145300",
        longitude: "47.238137"
    },
    {
        id: lastMovieHouseId++,
        name: "Планетарий",
        category: "Планетарий, Кинотеатр",
        open: "11:00",
        close: "20:00",
        latitude: "56.148613",
        longitude: "47.209160"
    },
    {
        id: lastMovieHouseId++,
        name: "Волжский",
        category: "Кинотеатр",
        open: "08:45",
        close: "02:00",
        latitude: "56.149381",
        longitude: "47.196174"
    },
]
// moviehouse  
export const mapRouter = (app) => {

    app.get("/moviehouse", (request, response) => {
        response.status(200).send(moviehouse)
    })

}