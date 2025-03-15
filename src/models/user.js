const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        miniLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.tenforums.com/attachments/tutorial-test/146359d1501443008-change-default-account-picture-windows-10-a-user.png"
    },
    about:{
        type:String,
        default:"This is a default User"
    },
    skills:{
        type:[String],
    }
},{timestamps:true})

const User = mongoose.model("User",userSchema);
module.exports = User;