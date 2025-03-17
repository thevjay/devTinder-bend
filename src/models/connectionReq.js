const mongoose = require('mongoose')

const connectionReqSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",  // reference to the user collection
        required:true,

    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{value} is incorrect status type`
        }
    }
},{timestamps:true});


// ConnectionRequest.find({fromUserId:2896646467476, toUserId:886868768768756})

connectionReqSchema.index({ fromUserId: 1 , toUserId: 1 })


connectionReqSchema.pre("save",function (next) {
    const connectionRequest = this;
    // Check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself! ")
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionReqSchema);

module.exports = ConnectionRequest;
