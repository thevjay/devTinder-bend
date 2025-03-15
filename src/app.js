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

connectDB().then(()=>{
    console.log("Database connection established...");
    app.listen(7777,()=>{
        console.log("Server is successfully listening on port 7777...")
    });    
})
.catch((err)=>{
    console.error("Database cannot be connected"+err)
})


