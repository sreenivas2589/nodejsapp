// JavaScript source code
import mongoose from 'mongoose'

// Define the schema for the user collection

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

// Create a model for the user collection using the defined schema

const user = mongoose.model('user', userSchema)

export default user