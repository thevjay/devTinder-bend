const express = require('express')
const connectDB = require('./config/database');
const app = express();
require('dotenv').config();
const User = require('./models/user')
const {validateSignUpData} = require('./utils/validation')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const { userAuth } = require('./middlewares/auth')
 
app.use(express.json());
app.use(cookieParser());

app.post("/signup",async(req,res)=>{
       
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

app.post("/login",async(req,res)=>{
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

app.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;

        res.send(user);
    }
    catch(error){
        // Send a meaningful error response
        res.status(400).json({ error: error.message || "Something went wrong!" });
    }
})


app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    try{
        // Sending a connection request
        const user = req.user;

        res.send( user.firstName + "sent the Connect request!");
    }catch(error){
        // Send a meaningful error response
        res.status(400).json({ error: error.message || "Something went wrong!" });
    }
})
// Feed API - GET /feed - get all the users from the database
app.get('/feed',async(req,res)=>{

    try{
        const users = await User.find({});

        res.send(users)
    }
    catch(err){
        res.status(500).send("Something went wrong ")
    }
})

connectDB()
    .then(()=>{
    console.log("Database connection established...");
    app.listen(7777,()=>{
        console.log("Server is successfully listening on port 7777...")
    });    
    })
    .catch((err)=>{
    console.error("Database cannot be connected"+err)
    })


