import dotenv from "dotenv"
dotenv.config()

import app from "./app"
import "./database"

(function(){
    app.listen(app.get("PORT"), () => {
        console.log(`Server on port ${app.get("PORT")}`)
    })
})();