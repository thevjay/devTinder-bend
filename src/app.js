const express = require('express')
const connectDB = require('./config/database');
const app = express();

require('dotenv').config();
require('./utils/cronjob')

const cookieParser = require('cookie-parser')
const cors = require('cors');
const http = require('http')
 
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,
}));



const authRouter  = require('./routes/auth');
const profileRouter = require('./routes/profile')
const requestRouter = require('./routes/requests')
const userRouter = require('./routes/userRouter');
const chatRouter = require('./routes/chatRoute')
const initializeSocket = require('./utils/socket');


app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);
app.use('/',chatRouter)

const server = http.createServer(app)
initializeSocket(server);

connectDB()
    .then(()=>{
    console.log("Database connection established...");
    server.listen(7777,()=>{
        console.log("Server is successfully listening on port 7777...")
    });    
    })
    .catch((err)=>{
    console.error("Database cannot be connected"+err)
    })


