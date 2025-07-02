// JavaScript source code
import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }

})

//create a model for the products collection using the defined schema

const productsModel = mongoose.model('products', productSchema)


export default productsModel