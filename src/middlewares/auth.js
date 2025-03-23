// Handle Auth Middleware for only Get requests GET, POST....requests
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userAuth = async(req,res,next)=>{
    // Read the token from the req cookies

    try{
        const { token } = req.cookies;
        if(!token){
            return res.status(401).send("Please Login!!")
        }

        const decodeObj = await jwt.verify(token,"fsd");
    
        const { _id } = decodeObj;
    
        const user = await User.findById(_id);
    
        if(!user){
            throw new Error("User not found")
        }

        req.user = user;
        next();
    
        // validate the token
        // Find the user
    
    }catch(error){
        // Send a meaningful error response
        res.status(400).json({ error: error.message || "Something went wrong!" });
    }
   }

module.exports = {userAuth};