const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const connectDB = require('./config/dbConnection')
const userschemas = require('./models/Usersmodel')
const noteschema = require('./models/Notesmodel')
const errorhandle = require('./middlewares/ErrorHandler')
const ExpressAsyncHandler = require('express-async-handler')

const app = express()
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
const PORT = process.env.PORT || 8080
app.use(express.static('public'))
connectDB();



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/login', (req, res) => {
    // res.send(`<h1>LOGIN PAGE</h1>`)
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.get('/signup', (req, res) => {
    // res.send(`<h1>SIGNUP PAGE</h1>`)
    res.sendFile(path.join(__dirname, 'public', 'signup.html'))
})

app.get('/shownote/:id', (req, res) => {
    res.status(200)
    .sendFile(path.join(__dirname, 'public', 'opennote.html'))
});

app.get('/shownote/:id', ExpressAsyncHandler(async (req, res) => {
    const id = await req.params.id
    console.log(id)
    const opennote = await noteschema.findOne({_id : id})
    console.log(opennote)
    res.status(200)
    .json({success:true, message :"Note Opened", note :opennote})
}));

app.use('/', require('./routes/userRoutes'))

app.use('/', require('./routes/notesRoutes'))


app.delete('/', ExpressAsyncHandler (async (req, res) => {
    const id = await req.body.id
    const dltnote = await noteschema.findOne({_id : id})
    if(!dltnote) {
        res.status(404)
        throw new Error("Note not Found");
    }
    console.log(dltnote)
    await noteschema.deleteOne(dltnote)
    res.status(200).json({success : true , message: "Deleted Successfully"})
}))

app.use(errorhandle);

app.listen(PORT, () => console.log(`Server Started at PORT http://localhost:${PORT}`))