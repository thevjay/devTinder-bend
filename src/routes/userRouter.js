const express = require('express')
const userRouter = express.Router();
const {userAuth} = require('../middlewares/auth')
const ConnectionRequest = require('../models/connectionReq')


const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

//Get all the Pending Connection request for the loggedIn user
userRouter.get('/user/requests/received',userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status:"interested"
        }).populate("fromUserId",USER_SAFE_DATA);
        //.populate("fromUserId","firstName lastName photoUrl age gender about");
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

userRouter.get('/user/connections',userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                { toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        })
        .populate("fromUserId",USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA)

        // Akshay => Elon => accepted
        // Elon => Mark => accepted

        const data = connectionRequests.map((row)=> {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId;
        });

        res.json({
            message:"Connections fetched successfully",
            data:data,
        })
    }
    catch(error){
        res.status(500).send('ERROR: ' + error.message);
    }
})


module.exports = userRouter;