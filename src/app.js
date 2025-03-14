const express = require('express')

const app = express();

app.get("/user",(req,res)=>{
    try{
        // Logic of DB call and get user data
        throw new Error("jhvvhvg");
        res.send("All Data is Sent");
    }
    catch(err){
        res.status(500).send("Some error occurs")
    }

})

app.use('/',(err,req,res,next)=>{
    if(err){
        // Log your error message
        res.status(500).send("Something went wrong");
    }
});

app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777...")
});


