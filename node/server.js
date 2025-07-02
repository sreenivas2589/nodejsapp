import express from "express"
import mongoose from "mongoose"
import { routes } from "./routes.js"
import { createProduct } from "./controller.js"

//create an express application

const app = express()

//this serves as a crucial middleware for handling JSON data sent in incoming HTTP requests.
app.use(express.json())

//connect to the MongoDB database using mongoose
// a test database will be automatically created.

mongoose.connect("mongodb://127.0.0.1:27017")
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB error:', err))

const db = mongoose.connection

/*console.log(db)*/

//listen for the open event to confirm successful connection
db.on("open", () => {

    console.log("Database connected successfully")
})

//listen for the error event to handle any connection errors

db.on("error", () => {
    console.log("Database connection error")
})

// Middleware to log request details
app.use(function (req, res, next) {
    console.log("Middleware executed")
    console.log(`Request Method: ${req.method}`)
    console.log(`Request URL: ${req.url}`)
    console.log("")
    next()
})


// Define routes
routes(app)


// Start the server and listen on port 3000
app.listen(3000, () => {

    console.log("Server is running on port 3000")

})
