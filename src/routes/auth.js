const express = require('express');
const { validateSignUpData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt')

const authRouter = express.Router();

authRouter.post("/signup",async(req,res)=>{
       
    try{
        // Validation of data
        validateSignUpData(req);

        const { firstName,lastName,emailId,password } = req.body;

        const userDB = await User.findOne({emailId:emailId});
        if(userDB){
            throw new Error("Invalid creadentials")
        }
        
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password,10)

        // Creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });

        await user.save();

        res.status(201).json({ message: "User Added Successfully!" });
    }
    catch(error){
        // Send a meaningful error response
        res.status(400).json({ error: error.message || "Something went wrong!" });
    }
})


authRouter.post("/login",async(req,res)=>{
    try{

        const { emailId, password } = req.body;

        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid creadentials")
        }
        
        // const isPasswordValid = await bcrypt.compare(password,user.password)

        const isPasswordValid = await user.validatePassword(password)
        if(isPasswordValid){

            // Create a JWT Token
            // const token = await jwt.sign({ _id:user._id },"fsd",{expiresIn:"1d"})
              const token = await user.getJWT();
            // Add the token to cookie and send the response Back to the user

            res.cookie("token", token,{expires: new Date(Date.now()+8*3600000)},{ httpOnly:true });
            res.send('Login Successfully')
        }
        else{
            throw new Error("Invalid creadentials");
        }
    }
    catch(error){
        // Send a meaningful error response
        res.status(400).json({ error: error.message || "Something went wrong!" });
    }
})


module.exports = authRouter;