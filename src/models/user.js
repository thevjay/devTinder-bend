const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
        validat(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: "+value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password: "+value)
            }
        }

    },
    age:{
        type:Number,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid"+value)
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://www.tenforums.com/attachments/tutorial-test/146359d1501443008-change-default-account-picture-windows-10-a-user.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url")
            }
        }
    },
    about:{
        type:String,
        default:"This is a default User"
    },
    skills:{
        type:[String],
    }
},{timestamps:true})



userSchema.methods.getJWT =async function(){
    const user = this;

    const token = await jwt.sign({ _id:user._id },"fsd",{expiresIn:"1d"})

    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password

    const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash)

    return isPasswordValid;
}

const User = mongoose.model("User",userSchema);
module.exports = User;