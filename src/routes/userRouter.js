const express = require('express')
const userRouter = express.Router();
const {userAuth} = require('../middlewares/auth')
const ConnectionRequest = require('../models/connectionReq');
const User = require('../models/user');


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


userRouter.get("/feed", userAuth, async(req,res)=>{
    try{

        // User Should see all the user cards except
        // 0. his own card
        // 1. his connections
        // 2. ignored people
        // 3. already sent the connection request

        // Example: Rahul = [mark, Donald, MSD, virat]
        // R -> Akshay -> rejected R -> Elon -> Accepted
        // Elon -> Rahul
        // Akshay -> [] not show the Rahul is rejected state
        
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        
        const skip = (page-1) * limit;

        // Find all connection requests (sent + received)
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                { fromUserId: loggedInUser._id},
                { toUserId: loggedInUser._id},
            ]
        })
        .select("fromUserId toUserId")

        // .populate("fromUserId","firstName")
        // .populate("toUserId","firstName")

        const hideUserFromFeed = new Set();
        connectionRequests.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        })

        const users = await User.find({
            $and: [
                { _id:{ $nin: Array.from(hideUserFromFeed) }},
                { _id:{ $ne:loggedInUser._id } },
            ]
        }).select(USER_SAFE_DATA)
        .skip(skip)                     // Apply pagination here
        .limit(limit);


        res.send(users)
    }
    catch(error){
        res.status(500).send("ERROR: "+error.message);
    }
})

module.exports = userRouter;
