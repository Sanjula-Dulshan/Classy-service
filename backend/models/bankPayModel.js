import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bankPaySchema = new Schema({

    invoiceNo : {
        type : String,
        required : true
    },

    Date : {
        type : String,
        //required : true
    },

    amount : {
        type : Number,
       // required : true
    },

    bankName : {
        type : String,
        required : true
    },

    branchName : {
        type : String,
        required : true
    },

    image : {
        type : Object,
      //  required : true
    },

    checkoutId : {
        type : String,
       // required : true
    },

}, {
    timestamps: true,
});

const BankPay = mongoose.model("bankpay", bankPaySchema);
export default BankPay;