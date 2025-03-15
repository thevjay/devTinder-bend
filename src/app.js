const express = require('express')
const connectDB = require('./config/database');
const app = express();
require('dotenv').config();
const User = require('./models/user')

app.use(express.json());

app.post("/signup",async(req,res)=>{
       
    // Creating a new instance of the User model

    const user = new User(req.body);

    try{
        await user.save();
        res.send("User Added Successfully!")
    }
    catch(error){
        console.error(error);
    }
})

// Get user by email
app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;

    try{
       const user = await User.findOne({ emailId: userEmail });
       if (user.length === 0){
        res.status(404).send("User not found")
       }else{
        res.send(user);
       }

    //    res.send(user);
    }
    catch(err){
        res.status(500).send("Something went wrong ")
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


