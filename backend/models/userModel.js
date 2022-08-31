const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  
    name: {
        type: String,
        required: [true,"Please enter your name"],
        trim:true
    },

    email: {
        type: String,
        required: [true,"Please enter your email"],
        trim:true
    },
    nic: {
        type: String,
        required: [true,"Please enter your NIC number"],
        trim:true
    },
    mobile: {
        type: String,
        required: [true,"Please enter your mobile number"],
        trim:true
    },
    password: {
        type: String,
        required: [true,"Please enter a password"]
    },
    role: {
        type: Number,
        default:0 // 0 => Normal User , 1 => Admin User
    },
    avatar: {
        type: String,
        default:"https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
    }

},{
    timestamps : true
})

 
module.exports = mongoose.model("Users", userSchema);
