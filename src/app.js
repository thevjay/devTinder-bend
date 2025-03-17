const express = require('express')
const connectDB = require('./config/database');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser')
const cors = require('cors');
 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
}));


const authRouter  = require('./routes/auth');
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/requests')
const userRouter = require('./routes/userRouter')


app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);

connectDB()
    .then(()=>{
    console.log("Database connection established...");
    app.listen(7777,()=>{
        console.log("Server is successfully listening on port 7777...")
    });    
    })
    .catch((err)=>{
    console.error("Database cannot be connected"+err)
    })


