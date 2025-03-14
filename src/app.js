const express = require('express')

const app = express();

app.get("/user",(req,res)=>{
    res.send({firstName: "Vijya",lastName:"Saini"})
})

app.post("/user",async(req,res)=>{
    console.log(req.body)
    // saving data to DB
    res.send("Data successfullly saved to the database")
});

app.delete("/user",(req,res)=>{
    res.send("Deleted Successfully")
})

app.use('/hello',(req,res)=>{
    res.send("Hello from the Dashboard!.")
})

app.use('/test',(req,res)=>{
    res.send("Hello from the server!.")
})

app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777...")
})


