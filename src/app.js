const express = require('express')

const app = express();

// ab?c --> /ac, /abc
// a(bc)?d  -->  /ad  /abcd
//Regx /a/ ->> /a^ 
// /.*fly/ --> butterfly

// Daynamic Routing

app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params)
    //console.log(req.query)
    res.send({firstName: "Vijya",lastName:"Saini"})
})


app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777...")
})


