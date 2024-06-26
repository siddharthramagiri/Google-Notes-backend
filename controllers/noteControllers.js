const noteschema = require('../models/Notesmodel')
const ExpressAsyncHandler = require('express-async-handler')
const errorhandle = require('../middlewares/ErrorHandler')

const getNotes =  async (req,res) => {
    console.log(req.body.user_id)
    let notes = await noteschema.find({user_id : req.body.user_id})
    // console.log(notes)
    res.status(200).json({success : true, notes})
};

const AddNotes = ExpressAsyncHandler(async (req,res) => {
    const {user_id , title , description} = req.body
    if(!user_id || !title || !description) {
        res.status(400)
        throw new Error("Error Missing Data")
    }
    console.log(req.body)
    let Note = await noteschema.create(req.body)
    res.status(201).json({success : true, message : "Note Created Successfully", Note})
    
});


const ShowNote = ExpressAsyncHandler(async (req,res) => {
    const {id} = req.body
    const opennote = await noteschema.findOne({_id : id})
    res.status(200).json({success:true,note : opennote})
});

module.exports = {getNotes,AddNotes,ShowNote}