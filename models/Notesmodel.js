const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    title: { type: String, require: [true, "title is Required"],},
    description: { type: String, require: [true, "Description is Required"],},
}, { timestamps: true })

module.exports = mongoose.model('noteschema', NoteSchema)