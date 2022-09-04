import mongoose from "mongoose";
const Schema = mongoose.Schema;

const payMethodSchema = new Schema({
    
    uid : {
        type : String,
       required : true
    },

    accName : {
        type : String,
       required : true
    },

    accNumber : {
        type : String,
       required : true
    },

    bankName : {
        type : String,
       required : true
    },

    branchName : {
        type : String,
        required : true
    },



}, {
    timestamps: true,
});

const Pay = mongoose.model("paymethod", payMethodSchema);
export default Pay;