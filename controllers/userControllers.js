const userschemas = require('../models/Usersmodel')
const ExpressAsyncHandler = require('express-async-handler')
const errorhandle = require('../middlewares/ErrorHandler')

const LoginUser = ExpressAsyncHandler(async (req,res) => {
    
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
});


const SignupUser = ExpressAsyncHandler( async (req,res) => {

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
    
});

module.exports = {LoginUser,SignupUser}