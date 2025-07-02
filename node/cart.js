// JavaScript source code
import mongoose from 'mongoose'


// Define the schema for the cart collection
const cartSchema = mongoose.Schema({
    productid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
        required: true
    }
})

// Create a model for the cart collection using the defined schema
const cart = mongoose.model('cart', cartSchema)

export default cart