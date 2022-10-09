import BankPay from "../models/bankPayModel.js";
import Checkout from '../models/checkoutModel.js';
import { v4 as uuidv4 } from 'uuid';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cloudinary = require('cloudinary').v2;
import dotenv from 'dotenv';
dotenv.config();

const BankPayCtrl = {
    getBankPay: async (req, res) => {
        try {
            const bankPay = await BankPay.find();
            res.json(bankPay);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    createBankPay: async (req, res) => {
        try {
            const { invoiceNo, Date, amount, bankName, branchName, checkoutId, image, } = req.body;
  
            const newBankPay = new BankPay({
                invoiceNo, Date, amount, bankName, branchName, checkoutId, image
            })

            await newBankPay.save()            
            .then((data) => {
                res.status(200).json({ data });
                 //add payemnt details to checkout
                 Checkout.findOneAndUpdate({ _id: checkoutId }, { paymentMethod: "bank", paymentId: data._id}).then(
                    console.log("payment details added to checkout", checkoutId)
                )
            }).catch((err) => {
                res.status(500).json({ msg: err.message });
                console.log("Error Here : ",err);
            });

            res.json({ msg: "Bank added successfully!" })


        } catch (err) {
            return res.status(500).json({ msg: "Outer" })
        }
    },

    deleteBankPay: async (req, res) => {
        try {
            await BankPay.findByIdAndDelete(req.params.id)
            res.json({ msg: "Bank deleted successfully!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getBankByInvoiceNo: async (req, res) => {
        try {
            const bankPay = await BankPay.findOne({ invoiceNo: req.params.invoiceNo });
            res.json(bankPay);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default BankPayCtrl;