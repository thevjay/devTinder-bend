const express = require('express')

const app = express();


app.use("/user",
    [(req,res,next)=>{
    // Route Handler
    // res.send("Route Hanlder 1");
    console.log("Handling the route user 1!!");
    // res.send("1st Response")
    next();
    //res.send("1st Response")
}],[(req,res,next)=>{
    //Route Handler 2
    console.log("Handling the route user 2!!");
    //res.send("2nd Response");
    next();
}],(req,res)=>{
    //Route Handler 2
    console.log("Handling the route user 3!!");
    res.send("3nd Response");
})

app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777...")
})


