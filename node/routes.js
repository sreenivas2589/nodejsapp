// JavaScript source code
import express from "express"
import { createProduct } from "./controller.js"
import { getProducts } from "./controller.js"
import jwt from "jsonwebtoken"
import { addToCart } from "./controller.js"
import { updateCart } from "./controller.js"
import { deleteCartItem } from "./controller.js"
import { getCartItems } from "./controller.js"
import { jwtnewUser } from "./controller.js"
import { accesstoken } from "./controller.js"
import { loginUser } from "./controller.js"
import { getProductsbyid } from "./controller.js"
import { deleteProducts } from "./controller.js"
import { editProduct } from "./controller.js"
import { homePage } from "./controller.js"


//function to define the routes for the application
export function routes(app) {
    //all the routes include the CRUD operations on products and cart items

    app.get("/",homePage)
    app.get("/products", getProducts)
    app.post("/products", createProduct)
    app.get("/products/:id", getProductsbyid)
    app.delete("/products", deleteProducts)
    app.put("/products", editProduct)

    //protected routes 
    app.get("/cart",accesstoken,getCartItems)
    app.post("/cart", accesstoken, addToCart)
    app.put("/cart", accesstoken,updateCart)
    app.delete("/cart", accesstoken, deleteCartItem)

    app.post("/register", jwtnewUser)
    app.post("/login", loginUser)
}

