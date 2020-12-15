//Packages
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Dummy Response Variable for Testing 
let dummyResponse = { "Test": "Success!!" }

//MONGO DB SETUP

//SCHEMA FOR USERS
let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    city: String
})

//SCHEMA FOR PRODUCTS
let productSchema = new mongoose.Schema({
    title: String,
    type: String,
    description: String,
    price: Number,
    rating: Number
})

//MODEL FOR USERS
let usersModel = new mongoose.model('users', userSchema);

//MODEL FOR PRODUCTS
let productsModel = new mongoose.model('products', productSchema);

//CONNECTION WITH MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/auth_assignment_db", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Database");
    })

//GET REQUEST
app.get('/', (req, res) => {
    res.send({ "Test": "Assignment Success!!" });
})

//ROUTE FOR REGISTRATION
app.post('/user/register', (req, res) => {
    let user = req.body;

    let userData = new usersModel(user);
    userData.save().then(() => {
        res.send({ "message": "user Created" });
    });   
})

//ROUTE FOR LOGIN
app.post('/user/login', async (req, res) => {
    let userDetails = req.body;
    const count = await usersModel.find(userDetails).countDocuments();

    if (count == 1) {
        jwt.sign({ user: userDetails }, 'SecretKey-Geet', (err, token) => { // Function for Creating Token
            if (err == null)
            {
                res.send({ "token": token }); 
            }
            else {
                res.send({"message":"Some Problem!! Please Login after Sometime"})
            }
            
        })
    }
    else {
        res.send({ "message": "Wrong Username or Password" });
    }
})




//ROUTES THAT WILL BE ACCESSIBLE BY TOKEN

//ROUTE FOR FETCHING PRODUCT

app.get('/products/fetchProduct', verifyToken, (req, res) => {

    //Verifying Token
    jwt.verify(req.token, 'SecretKey-Geet', (err, userDetails) => {
        if (err == null) {
            console.log(userDetails);
            //CODE TO INSERT PRODUCT IN DATABASE AFTER LOGIN

            let products = productsModel.find().then((product) => {
                res.send(JSON.stringify(product));
            });

            
        }
        else {
            res.send({"message": "Invalid Token"})
        }
    })
})

//ROUTE FOR INSERTING PRODUCT

app.post('/products/insertProduct', verifyToken, (req, res) => {
    //Verifying Token
    jwt.verify(req.token, 'SecretKey-Geet', (err, userDetails) => {
        if (err == null) {
            console.log(userDetails);
            //CODE TO INSERT PRODUCT IN DATABASE AFTER LOGIN
            let product = req.body;
            let productData = new productsModel(product);
            productData.save().then(() => {
                console.log("Product Inserted")
            })

            res.send({ "message": "Token Authenticated" });
        }
        else {
            res.send({"message": "Invalid Token"})
        }
    })
})


//MIDDLEWARE CODE TO VERIFY TOKEN
function verifyToken(req, res, next) {
    let headerData = req.headers.authorization;

    if (headerData != undefined) {
        let token = headerData.split(" ")[1];
        req.token = token;
        next();
    }
    else {
        res.status(403);
        res.send({ "message": "No Token Available" });
    }
    
}

//STARTING SERVER
app.listen(3000, () => {
    console.log('server running');
})