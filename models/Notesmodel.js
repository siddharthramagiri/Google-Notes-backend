const mongoose = require('mongoose')

const NoteSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : 'userschemas',
    },
    // email: {type: String, require: true},
    title: { type: String, require: [true, "title is Required"],},
    description: { type: String, require: [true, "Description is Required"],},
}, { timestamps: true })

module.exports = mongoose.model('noteschema', NoteSchema)