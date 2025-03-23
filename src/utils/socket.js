const socket = require('socket.io')
const crypto = require('crypto');
const { Chat } = require('../models/chat');

const getSecretRommId = ({userId, targetUserId}) => {
   return crypto
        .createHash("sha256")
        .update([userId, targetUserId].sort().join('_'))
        .digest('hex')
    };

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
        }
    })

    io.on("connection", (socket)=>{
        // Handle events

        socket.on("joinChat",({ firstName ,userId , targetUserId })=>{
            const roomId = getSecretRommId(userId,targetUserId)


            console.log(firstName+" Joining Room Id"+roomId)

            socket.join(roomId);


        })

        socket.on("sendMessage",async ({ firstName, lastName,userId, targetUserId, text }) => {
            // Save messages to the database
            try{
                const roomId = getSecretRommId(userId,targetUserId)

                // TODO: Check if userId & targetUserId are friends

                let chat = await Chat.findOne({ participants: { $all : [userId, targetUserId]}})

                if(!chat){
                    chat = new Chat({
                        participants:[ userId, targetUserId],
                        messages: [],
                    })
                }

                chat.messages.push({
                    senderId:userId,
                    text
                })

                await chat.save();
                io.to(roomId).emit("messageReceived",{ firstName,lastName, text})
            }
            catch(err){
                console.error(err);
            }
        })

        socket.on("disconnect",()=>{

        })
    })

}

module.exports = initializeSocket;