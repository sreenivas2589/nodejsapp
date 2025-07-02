// JavaScript source code
import productsModel from "./products_model.js"
import cart from "./cart.js"
import jwt from "jsonwebtoken"
import user from "./login_schema.js"
import bcrypt from "bcrypt"

// you can also modify the below secret key as you wish
// you need to enter this key in the request body while accesing the protected routes(cart)
const secretkey = "secret"

// Function to create a new product
export const createProduct = async (req,res) => {
    //create a new product in the database
    try {
        const { name, price, description, quantity } = req.body

        // Validate input
        if (!name || !price || !description || !quantity) {
            return res.status(400).send({ error: 'All fields are required' })
        }
        // Save the product to the database
        const newProduct = await productsModel.create({
            name:name,
            price:price,
            description:description,
            quantity:quantity
        })

       
        const products = await productsModel.find()

        // Return the created product in the response
        res.status(201).json({ product: "product added successfully", product: products })
    }
    // Handle any errors that occur during the creation process
    catch (err) {
        res.status(400).json({ error: err.message })
    }

}

// Function to get all products
export const getProducts = async (req, res) => {
    // Fetch all products from the database
    try {
        const products = await productsModel.find()
        res.json(products)
    }

    // Handle any errors that occur during the fetching process

    catch (err) {
        res.status(500).json({ error: 'Server error' })
    }
}

// Function to get a product by ID
export const getProductsbyid = async (req, res) => {

    // Fetch a product by ID from the database

    try {
        // Extract the product ID from the request parameters
        const productId = req.params.id
        const product = await productsModel.findById(productId)

        // if the product is not found, return a 404 error

        if (!product) {
            return res.status(404).send({ error: 'Product not found' })
        }
        res.json(product)
    }

    // Handle any errors that occur during the fetching process
    catch (err) {
        res.status(500).json({ error: 'Server error or product not found' })
    }

}

export const editProduct = async (req, res) => {
    const { productid, name, price, description, quantity } = req.body

    // Update a product in the database
    try {
        // Validate input
        if (!productid || !name || !price || !description || !quantity) {
            return res.status(400).send({ error: 'All fields are required' })
        }
        // Find the product by ID and update it
        //new:true option returns the updated document

        const product = await productsModel.findByIdAndUpdate(productid, {
            name: name,
            price: price,
            description: description,
            quantity: quantity
        }, { new: true })

        // If the product is not found, return a 404 error
        if (!product) {
            return res.status(404).send({ error: 'Product not found' })
        }

        // Return the updated product in the response
        res.status(200).json({ message: 'Product updated successfully', product })
    }

    // Handle any errors that occur during the updating process
    catch (err) {
        res.status(500).json({ error: 'Server error' })
    }


}

export const homePage = (req, res) => {

    res.send("Welcome to Backend for the ShoppyGlobe application using Node.js, Express, and MongoDB. Github(https://github.com/sreenivas2589/nodejsapp)")

}

export const deleteProducts = async (req, res) => {
    const { productid } = req.body
    try {
        // Validate input
        if (!productid) {
            return res.status(400).send({ error: 'Product ID is required' })
        }

        // Find the product by ID and delete it

        const product = await productsModel.findByIdAndDelete(productid)

        if (!product) {
            return res.status(404).send({ error: 'Product not found' })
        }
        res.status(200).send({ message: 'Product deleted successfully' })

    }
    catch (err) {
        res.status(500).json({ error: 'Server error' })
     }

}

// Function to get all items in the cart
export const getCartItems = async (req, res) => {
    // Fetch all items in the cart from the database
    // Ensure the user is authenticated before accessing the cart
    try {
        const cartItems = await cart.find()
        if (cartItems.length === 0) {
            return res.status(404).send({ error: 'Cart is empty' })
        }
        res.json(cartItems)
    }

    // Handle any errors that occur during the fetching process
    catch (err) {
        res.status(500).json({ error: 'Server error' })
    }

}

// Function to add a product to the cart
export const addToCart = async (req, res) => {

    // Add a product to the cart in the database

    try {
        // Extract product ID and quantity from the request body
        const { productid, quantity } = req.body

        const product = await productsModel.findById(productid)

        if (quantity > product.quantity) {
            return res.status(400).send('Quantity exceeds available stock. Please reduce the quantity.')
        }

        // Validate input
        if (!productid || !quantity) {
            return res.status(400).send('Product ID and quantity are required')
        }


        // Check if the product exists in the database
        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }

        const existingCartItem = await cart.findOne({ productid: productid })
        // Check if the product is already in the cart
        if (existingCartItem) {
            
            // If the product is already in the cart return it with a 200 status code
            return res.status(200).send("item already exist")

        }
        // If the product is not in the cart, create a new cart item
        const newCartItem = await cart.create({
            productid: productid,
            name: product.name,
            price: product.price,
            quantity: quantity
        })

        const newcart = await cart.find() // Fetch updated cart items after adding

        res.status(201).json({ message: "cart Item Added Successfully", newcart: newcart })
        
    }

    // Handle any errors that occur during the adding process
    catch (err) {
        res.status(400).json({ error: err.message })

    }
}


// Function to update the quantity of a product in the cart

export const updateCart = async (req, res) => {
    // Update the quantity of a product in the cart in the database
    try {
        const { productid, quantity } = req.body

        const cartItem = await cart.findOne({ productid: productid })
        const product = await productsModel.findById(productid)

        //if the product is not found in the cart, return a 404 error
        if (!cartItem) {
            return res.status(404).send({ error: 'Cart item not found' })
        }

        if (quantity > product.quantity) {
            return res.status(400).send('Quantity exceeds available stock. Please reduce the quantity.')
        }

        //set the new quantity for the cart item
        cartItem.quantity = quantity

        //save the updated cart item to the database
        await cartItem.save()

        //return the updated cart item in the response
        res.status(200).json({ message: "quantity changed successfully", cartItem: cartItem })
    }

    // Handle any errors that occur during the updating process
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}


// Function to delete a product from the cart

export const deleteCartItem = async (req, res) => {
    try {
        const { productid } = req.body

        const cartItem = await cart.findOneAndDelete({ productid: productid })
        if (!cartItem) {
            return res.status(404).send({ error: 'Cart item not found'})
        }
        const updatedCart = await cart.find() // Fetch updated cart items after deletion

        res.status(200).json({ message: 'Cart item deleted successfully', updatedcart: updatedCart })
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// Function to register a new user with password

export const jwtnewUser = async (req, res) => {
    try {
        
        const { username, password } = req.body

        if (password.length < 2) {
            return res.status(400).send({ error: 'Password must be at least 2 characters long' })
        }

        // Here you would typically save the user to the database
        // For this example, we will just create a token without saving to a database
        //check if username already exists in the database
        const checkuser = await user.findOne({ username: username })

        if (checkuser) {
            return res.status(400).send({ error: 'Username already exists' })
        }

        // Hash the password using bcrypt
        // convert the password to a hash before saving it to the database
        // This is important for security reasons, as it prevents storing plain text passwords
        // before saving the password to the database the below function converts it into a hash with 10 rounds of hashing(level of security)
        // more the rounds of hashing, more the security but it will take more time to hash the password
        const passwordhash = await bcrypt.hash(password, 10) 

        const newUser = await user.create({
            username: username,
            password: passwordhash
        })

        // Save the user to the database

        res.status(201).json({ newUser })
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
   
}

// Function to log in a user and return a JWT token

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body

        
        // Find the user in the database

        const existingUser = await user.findOne({ username: username })

        const validPassword = await bcrypt.compare(password, existingUser.password)

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // If the user is not found, return a 404 error
        if (!existingUser) {
            return res.status(404).send({ error: 'User not found' })
        }
        // Create a JWT token
        // The token will be signed with the user's secret key
        // The token will expire in 1 hour,you will have to regenerate the token after 1 hour

        const token = jwt.sign({ username: existingUser.username }, secretkey, { expiresIn: '1h' })
        res.status(200).json({ token })

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

// Middleware to verify the JWT token and check for authorization
export const accesstoken = (req, res, next)=> {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized")
    }

    else {
        // Extract the token from the Authorization header
        const token = req.headers.authorization.split(" ")[1]

        // If the token is not provided, return an unauthorized response
        if (!token) {
            return res.status(401).send("Unauthorized")
        }
        // If the token is provided, verify it using the secret key
        // Verify the token using the secret key provided in the request body
        // You should enter the secret key in the request body as JSON

        const { secretkey } = req.body

        // If the secret key is not provided, return a forbidden response
        jwt.verify(token, secretkey, (err, user) => {
            if (err) {
                return res.status(403).json({ error: "Forbidden, secretkey is incorrect or not entered.Please enter secret key" })
            }
            req.username = user
            next()
        })


    }
    

}