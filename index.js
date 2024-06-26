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
});

app.get('/login',(req,res) => {
    // res.send(`<h1>LOGIN PAGE</h1>`)
    res.sendFile(path.join(__dirname,'public','login.html'))
})

app.get('/signup',(req,res) => {
    // res.send(`<h1>SIGNUP PAGE</h1>`)
    res.sendFile(path.join(__dirname,'public','signup.html'))
})

app.get('/shownote',(req,res) => {
    res.sendFile(path.join(__dirname,'public','opennote.html'))
})

app.use('/',require('./routes/userRoutes'))

app.use('/',require('./routes/notesRoutes'))


app.post('/deletenote', (req,res) => {
    
})

app.use(errorhandle);

app.listen(PORT , () => console.log(`Server Started at PORT http://localhost:${PORT}`))