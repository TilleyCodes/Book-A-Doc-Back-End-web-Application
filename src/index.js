const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

app.listen(3000, async () => {
    console.log("Server started")
    await mongoose.connect("mongodb://127.0.0.1:27017/book_a_doc_db")
    console.log("Database connected")
})