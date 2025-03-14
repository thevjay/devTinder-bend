const express = require('express')

const app = express();

const {adminAuth} = require('./middlewares/auth')

app.use('/admin',adminAuth);

app.get("/admin/getAllData",(req,res)=>{
    // Logic of fetching all data

    res.send("All Data is Sent");
})

app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777...")
});


