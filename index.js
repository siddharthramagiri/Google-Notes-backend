const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const connectDB = require('./config/dbConnection')
const userschemas = require('./models/Usersmodel')
const noteschema = require('./models/Notesmodel')
const errorhandle = require('./middlewares/ErrorHandler')
const ExpressAsyncHandler = require('express-async-handler')
const expressAsyncHandler = require('express-async-handler')

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
        res.status(400)
        // .json({success:false,message:"Email or password is'nt correct"})
        throw new Error("Email or Password is'nt Corrent")
    }
}))

app.post('/signup', ExpressAsyncHandler( async (req,res) => {

    const {email , username , password} = req.body
    if(!username || !email || !password) {
        res.status(400)
        throw new Error("All Fields are Mandatory ");
    }
    let useravailable = await userschemas.findOne({email : email})
    if (useravailable) {
        res.status(400)
        // json({success: false, message : "User already Exists"})
        throw new Error("User already Exists");
    } else {
        let user = await userschemas.create(req.body)
        console.log("User Created")
        res.status(201).json({success:true,message:"User Created",user: user})
    }
    
}));

app.post('/getnotes', async (req,res) => {
    console.log(req.body.user_id)
    let notes = await noteschema.find({user_id : req.body.user_id})
    // console.log(notes)
    res.status(200).json({success : true, notes})
})

app.post('/addnote', expressAsyncHandler(async (req,res) => {
    const {user_id , title , description} = req.body
    if(!user_id || !title || !description) {
        res.status(400)
        throw new Error("Error Missing Data")
    }
    console.log(req.body)
    let Note = await noteschema.create(req.body)
    res.status(201).json({success : true, message : "Note Created Successfully", Note})
    
}))

app.get('/shownote',(req,res) => {
    res.sendFile(path.join(__dirname,'public','opennote.html'))
})

app.post('/shownote', expressAsyncHandler(async (req,res) => {
    const {id} = req.body
    const opennote = await noteschema.findOne({_id : id})
    res.status(200).json({success:true,note : opennote})
}))

app.post('/deletenote', (req,res) => {
    
})

app.use(errorhandle);

app.listen(PORT , () => console.log(`Server Started at PORT http://localhost:${PORT}`))