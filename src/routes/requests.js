const express = require('express');
const { userAuth } = require('../middlewares/auth');

const requestRouter = express.Router();


requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    try{
        // Sending a connection request
        const user = req.user;

        res.send( user.firstName + "sent the Connect request!");
    }catch(error){
        // Send a meaningful error response
        res.status(400).json({ error: error.message || "Something went wrong!" });
    }
})

module.exports = requestRouter;