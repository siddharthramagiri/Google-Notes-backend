const mongoose = require('mongoose')

const Userschema = mongoose.Schema({
    email: { type: String, require: [true, "Email is Required"], unique : true},
    username: { type: String, require: [true, "Username is Required"],unique : true},
    password: { type: String, require: [true, "Password is Required"],}
}, { timestamps: true })

module.exports = mongoose.model('userschemas', Userschema)