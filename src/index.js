const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

// ERROR HANDLING
// Wildcard * means "match any route"
// Put at the end of route declarations
// to catch anything that does not match an earlier route
app.get('*', (request, response) => {
    console.log('User tried to visit ' + request.path)
    response.status(404).json({
        message: 'Page not found. ',
        attemptedPath: request.path
    })
})

// Error handling catcher
// applies to every route in the server by using .use
app.use((error, request, response, next) => {
    console.log('Error occurred in the server.')
    console.log(JSON.stringify(error))
    response.json({
        message: error.message
    })
})

app.listen(3000, async () => {
    console.log("Server started")
    await mongoose.connect("mongodb://127.0.0.1:27017/book_a_doc_db")
    console.log("Database connected")
})