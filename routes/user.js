import { users } from "./auth.js"


export const userRouter = (app) => {

    app.put("/user", (request, response) => {
        const {password,firstName,lastName} = request.body
        if ( [password,firstName,lastName].includes(undefined) ) {
            response.status(400).send("Проблемы при обновлении!")
            return
        }
        let token = request.headers.authorization
        if (token){
            token = token.replace(/[^0-9]/g,"")
            const user = users.find(x => x.token == token)
            if (user){
                user.firstName  = (firstName != "")? firstName : user.firstName
                user.lastName   = (lastName != "")? lastName : user.lastName
                user.password   = (password != "")? password : user.password
                const ouser = {...user}
                delete ouser.password
                delete ouser.token
                   
                response.status(200).send(ouser)
                return
            }
        }
        response.status(401).send("Неавторизированный доступ!")
    })

    app.get("/user", (request, response) => {
        let token = request.headers.authorization
        if (token){
            token = token.replace(/[^0-9]/g,"")
            const user = users.find(x => x.token == token)
            if (user){
                const ouser = {...user}
                delete ouser.password
                delete ouser.token
                   
                response.status(200).send(ouser)
                return
            }
        }
        response.status(401).send("Неавторизированный доступ!")
    })


}