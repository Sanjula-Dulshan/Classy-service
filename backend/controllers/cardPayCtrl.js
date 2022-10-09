import CardPay from '../models/cardPayModel.js';
import Checkout from '../models/checkoutModel.js';
import { v4 as uuidv4 } from 'uuid';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cloudinary = require('cloudinary').v2;
import dotenv from 'dotenv';
dotenv.config();

const CardPayCtrl = {
    getCardPay: async (req, res) => {
        try {
            const cardPay = await CardPay.find();
            res.json(cardPay);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createCardPay: async (req, res) => {
        try {
            const { uid, cardName, cardNumber, cvv, expiryDate, amount,checkoutId } = req.body;
    
            const newCardPay = new CardPay({
                uid, cardName, cardNumber, cvv, expiryDate, amount
            })
    
            await newCardPay.save()
                .then((data) => {
                    res.status(200).json({ data });
                    
                    //add payemnt details to checkout
                    Checkout.findOneAndUpdate({ _id: checkoutId }, { paymentMethod: "card", paymentId: data._id}).then(
                        console.log("payment details added to checkout", checkoutId)
                    )

                }).catch((err) => {
                    res.status(500).json({ msg: err.message });
                    console.log("Error Here : ", err);
                });
    
            res.json({ msg: "Card added successfully!" })
    
        } catch (err) {
            return res.status(500).json({ msg: "Card payment saving failed" })
        }
    
    },

    deleteCardPay: async (req, res) => {
        try {
            await CardPay.findByIdAndDelete(req.params.id)
            res.json({ msg: "Card deleted successfully!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getCardByUid: async (req, res) => {
        try {
            const cardPay = await CardPay.findOne({ uid: req.params.uid });
            res.json(cardPay);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }



    
}

export default CardPayCtrl;


