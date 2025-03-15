const express = require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');

const profileRouter = express.Router();


profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;

        res.send(user);
    }
    catch(error){
        // Send a meaningful error response
        res.status(400).json({ error: error.message || "Something went wrong!" });
    }
})

// Feed API - GET /feed - get all the users from the database
profileRouter.get('/feed',async(req,res)=>{

    try{
        const users = await User.find({});

        res.send(users)
    }
    catch(err){
        res.status(500).send("Something went wrong ")
    }
})



module.exports = profileRouter;