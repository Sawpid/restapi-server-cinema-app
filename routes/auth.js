let lastUserId = 1

export let users = [
    {
        userId: lastUserId++,
        avatar: "profile_0.webp",
        email: "vasya@mail.ru",
        password: "qwerty",
        firstName: "Vasya",
        lastName: "Ivanov",
        lastView: []
    },
    {
        userId: lastUserId++,
        avatar: "",
        email: "admin@admin.com",
        password: "password",
        firstName: "John",
        lastName: "Johnson",
        lastView: []
    },
]

export const authRouter = (app) => {
    app.post("/auth/login", (request, response) => {
        const { email, password } = request.body
        if ( [email,password].includes(undefined) ) {
            response.status(400).send("Неверные данные!")
            return
        }
        const user = users.find(x => x.email == email)
        if (user) {
            if (user.password == password){
                user.token = Date.now()
                response.status(200).send({"token": user.token})
            }else{
                response.status(401).send("Неверный пароль!")
            }
        }else{
            response.status(401).send("Пользователь не найден!")
        }
    })
    app.post("/auth/register", (request, response) => {
        const {email,password,firstName,lastName} = request.body
        if ( [email,password,firstName,lastName].includes(undefined) ) {
            response.status(400).send("Неверные данные!")
            return
        }
        if (users.find(x => x.email == request.body.email)){
            response.status(401).send("Пользователь уже существует!")
        }else{
            users.push({
                "userId": lastUserId++,
                "avatar": "",
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "lastView": []
            })
            response.status(200).send("Пользователь создан!")
        }
        console.log(users)
    })
    app.get("/user/auth/:email", (request, response) => {
        const email = request.params.email
        if (email){
            const user = users.find(x => x.email == email)
            if (user && "token" in user){
                response.status(200).send("Пользователь авторизован")
            }else{
                response.status(401).send("Пользователь не авторизован")
            }
            return
        }
        response.status(400).send("Ошибка сервера!")
    })
    app.get("/auth/user/list", (request, response) => {
        let token = request.headers.authorization
        if (token){
            token = token.replace(/[^0-9]/g,"")
            if (users.find(x => x.token == token)){
                const ousers = users.map(a => {return {...a}}).map(item => {
                    delete item.password
                    delete item.token
                    return item
                })
                response.status(200).send(ousers)
                return
            }
        }
        response.status(401).send("Не авторизован!")
        
    })
}