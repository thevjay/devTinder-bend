const express = require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');
const {validateEditProfileData} = require('../utils/validation');

const profileRouter = express.Router();


profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user = req.user;

        res.send(user);
    }
    catch(error){
        // Send a meaningful error response
        res.status(400).json({ error: error.message || "Something went wrong!" });
    }
})

profileRouter.put('/profile/edit',userAuth,async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request")
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
        
        await loggedInUser.save();

        res.json({
            message:`${loggedInUser.firstName}, Your Profile Updated Successfully`,
            data:loggedInUser
        })
    }
    catch(error){
        // Send a meaningful error response
        res.status(400).json({ error: error.message || "Something went wrong!" });
    }
});



module.exports = profileRouter;