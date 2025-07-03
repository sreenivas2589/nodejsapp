Build APIs with Node.js and Express.js for Shoppyglobe E-commerce 

Please follow the instructions here to start the application and test the api's in 

Thunderclient or postman 

1.extract the zip file name "node_express_project.rar"

2.after extracting the zip file you will see folder named "node"

3.In the command prompt type "cd node" to enter into "node" folder

4.after entering into "node" folder you will find all the files.

5.Here you can also find the "package.json" file where you can see all the dependencies 

that are required to start the application

6.After you are in "node" folder please enter "npm install" in the command prompt

7.This command will install all the required dependencies to start the application.

8.after installing all the required dependencies you can see new folder called 

"node_modules" which will be created where all the dependencies will be present.

9.In the command prompt type "npm start".This command will start the application.This 

command only executes when you are inside "node" folder where "package.json" file

exists.

10.Application will run on port no 3000 so the address of the server will be following 

http://localhost:3000

11.to stop the server please press ctrl+c

11.Here you can test all the required api routes in the thunderclient extension or 

postman software

12.All the screenshots of api testing have been placed in "API_Screens" folder inside 

"node" folder

13.This project is also uploaded to github page(https://github.com/sreenivas2589/nodejsapp)

14.Mongodb database screenshots will be present in "Mongodb_Screens" folder

14.Procedure for api testing

15.please include "JWT" as the token prefix in the auth section in Thunderclient and 

enter the JWT token in the "bearer token" field

16.if testing using postman please include "JWT " in the Authorization field in the 

Headers section and enter the generated token.

17.if the authorization field is not present in headers section you can add it by

typing "Authorization" in "key" field

"API CALL STRUCTURE"

route(GET /products)
structure:none

route(GET /products/id)
structure:none

route(POST /products)
structure:
{
    "name":"product name",
    "price":"enter price of product",
    "desription":"enter your description",
    "quantity":"enter quantity"
}

route(PUT /products)
structure:
{
    "productid":"product id of product that need to be updated",
    "name":"new product name",
    "price":"new price of product",
    "desription":"new description",
    "quantity":"new quantity"
}

route(DELETE /products)
structure:
{
    "productid":"product id that needs to be deleted"
}

route(POST /register)
structure:
{
    "username":"enter username",
    "password":"enter password"
}

route(POST /login)
structure:
{
    "username":"enter username to login",
    "password":"enter password to login"
}

//all the cart routes are protected with authentication middleware

route(GET /cart)
structure:
{
    "secretkey":"secret"
}

route(POST /cart)
structure:
{
    "productid":"enter the productid that you want to add to cart",
    "quantity":"enter the quantity to add to cart",
    "secretkey":"secret"
}

route(PUT /cart)
structure:
{
    "productid":"enter the productid that you want to change the quantity of",
    "quantity":"enter the new quantity",
    "secretkey":"secret"
}

route(DELETE /cart)
strucutre:
{
    "productid":"enter the productid that you want to delete",
    "secretkey":"secret"
}


Thanks and regards,
S Sreenivas.