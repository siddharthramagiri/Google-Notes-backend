const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const connectDB = require('./config/dbConnection')
const userschemas = require('./models/Usersmodel')
const noteschema = require('./models/Notesmodel')
const errorhandle = require('./middlewares/ErrorHandler')
const ExpressAsyncHandler = require('express-async-handler')

const app = express()
app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
const PORT = process.env.PORT || 8080
app.use(express.static('public'))
connectDB();

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html'))
})

app.get('/login',(req,res) => {
    // res.send(`<h1>LOGIN PAGE</h1>`)
    res.sendFile(path.join(__dirname,'public','login.html'))
})

app.get('/signup',(req,res) => {
    // res.send(`<h1>SIGNUP PAGE</h1>`)
    res.sendFile(path.join(__dirname,'public','signup.html'))
})

// END POINTS OF API
app.post('/login',ExpressAsyncHandler(async (req,res) => {
    // let user = userschemas.find(req.body);
    // if(!user) {
    //     console.log(`User not found`)
    //     res.status(200).json({success:true,message:"User not Found"})
    // } else {
    //     console.log(`User found`)
    //     res.status(200).json({success:true,message:"user found"});
    // }
    const {email, password} = req.body
    if(!email || !password) {
        res.status(400);
        throw new Error("All Fields are mandatory")
    }
    const user = await userschemas.findOne({email});
    // console.log("Password is : ",user.password ,"Your Password : ",password)
    if(user && (user.password == password)) {
        console.log("Logged in Successfully")
        res.status(200).json({success:true,message:"Logged in Successfully",user : user})
    } else {
        res.status(400);
        throw new Error("Email or Password is'nt Corrent")
    }
}))

app.post('/signup', ExpressAsyncHandler( async (req,res) => {

    let user = userschemas.create(req.body)
    res.status(200).json({success:true, user : user})

    const {email , username , password} = req.body
    if(!username || !email || !password) {
        res.status(400)
        throw new Error("All Fields are Mandatory ");
    }
    let useravailable = await userschemas.findOne({email : email})
    if (useravailable) {
        res.status(400)
        // res.status(400).json({success: false, message : "User already Exists"})
        throw new Error("User already Exists");
    } else {
        let user = await userschemas.create(req.body)
        console.log("User Created")
        res.status(201).json({success:true, user: user})
    }
    
}));

app.post('/addnote', (req,res) => {
    const {userToken} = req.body
    res.sendFile("public/signup.html",{root:__dirname})
})

app.post('/deletenote', (req,res) => {
    
})

app.use(errorhandle);

app.listen(PORT , () => console.log(`Server Started at PORT http://localhost:${PORT}`))