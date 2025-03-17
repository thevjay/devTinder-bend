const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionReq')
const User = require('../models/user')

const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowed_status = ["ignored","interested"];
    if(!allowed_status.includes(status)){
        return res.status(400).json({
            message:"Invalid status type: " + status
        })
    }

    // if(fromUserId === toUserId ){
    //     return res.status(400).json({
    //         message:"You Cannot make your self"
    //     })
    // }

    const toUser = await User.findById(toUserId);
    if(!toUser){
        return res.status(404).json({
            message:"User not found"
        })
    }

    // If there is an existing ConnectionRequest
    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or:[
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId },
        ]
    });

    if(existingConnectionRequest){
        return res.status(400).send({message:"Connection request Already Exists!"})
    }

    const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
    })

    const data = await connectionRequest.save();

    res.json({
        message:req.user.firstName+" is "+status+" in "+toUser.firstName,
        data
    })
        
    }catch(error){
        // Send a meaningful error response
        res.status(400).json({ error: error.message || "Something went wrong!" });
    }
})


requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const { status , requestId } = req.params; 

        const allowed_status = ["accepted","rejected"];
        if(!allowed_status.includes(status)){
            return res.status(400).json({
                message:"Status not allowed! "
            })
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested",
        });

        if(!connectionRequest){
            return res.status(404).json({
                message:"Connection request not found"
            })
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.json({
            message:"Connection request "+status,
            data
        })

        // Validate the status

        // msd => mark
        // loggedInId = toUserId
        // status = interested
        // request Id should be valid

    }
    catch(error){
        // Send a meaningful error response
        res.status(400).json({ error: error.message || "Something went wrong!" });
    }
})

module.exports = requestRouter;