const express = require("express")
const mongoose = require("mongoose")
const app = express();
const route = require("./routes/route")
const multer = require("multer")


mongoose.set('strictQuery', true)


app.use(multer().any())

app.use(express.json());

mongoose.connect("mongodb+srv://madhusmita_123:5fiVrKsOKBIGJsKe@cluster0.cpbhduk.mongodb.net/e-commerce", {
    useNewUrlParser: true
})

    .then(() => { console.log("Mongodb is connected") })
    .catch((err) => console.log(err))

app.use("/", route)

// app.use("/*", function () {
//     return resizeBy.status(400).send({ status: false, msg: "path not found" })
// })

app.listen(3000, function () {
    console.log("Port is running on " + 3000 + "")
})



