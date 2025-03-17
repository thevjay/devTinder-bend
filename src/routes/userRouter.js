const express = require('express')
const userRouter = express.Router();
const {userAuth} = require('../middlewares/auth')
const ConnectionRequest = require('../models/connectionReq')


//Get all the Pending Connection request for the loggedIn user
userRouter.get('/user/requests/received',userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status:"interested"
        }).populate("fromUserId","firstName lastName photoUrl age gender about");
        //.populate("fromUserId",["firstName","lastName"]);



        res.json({
            message:"Data fetched successfully",
            data:connectionRequests,
        })
    }
    catch(error){
        res.status(500).send("ERROR: "+error.message);
    }
})


module.exports = userRouter;