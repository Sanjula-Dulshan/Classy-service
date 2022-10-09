import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cardPaySchema = new Schema({
    uid: {
        type: String,
        required: true,
    },

    cardName: {
        type: String,
        required: true,
    },

    cardNumber: {
        type: String,
        required: true,
    },

    cvv: {
        type: String,
        required: true,
    },

    expiryDate: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

}, {
    timestamps: true,
});

const CardPay = mongoose.model("cardpay", cardPaySchema);
export default CardPay;

