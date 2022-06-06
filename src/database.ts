import mongoose from "mongoose"

(async function(){
    await mongoose
        .connect('mongodb://db:27017')
        .then(() => console.log("Successfuly connect to db."))
        .catch((err) => console.log("Connection Error:", err))
})()