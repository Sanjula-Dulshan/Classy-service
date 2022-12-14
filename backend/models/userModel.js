import mongoose from 'mongoose';
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
        default:0          // 0 => Normal User , 1 => Admin User
    },
    avatar: {
        type: String,
        default:"https://res.cloudinary.com/dl99x/image/upload/v1665520140/avatar_cugq40_osziik.png"
    },
    savedDate: {
        type: String
    },

},{
    timestamps : true
})

 
const Users = mongoose.model("Users", userSchema);
export default Users;

