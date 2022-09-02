import BankData from '../models/payMethodModel.js';

const PatMethodCtrl = {
    getBanks: async (req, res) => {
        try {
            const banks = await BankData.find();
            res.json(banks);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    createBank: async (req, res) => {
        try {
            const { bankName, bankCode, accountName, accountNumber, accountType } = req.body;
            const bank = await BankData.findOne({ bankName })
            if (bank) return res.status(400).json({ msg: "This bank already exists." })

            const newBank = new BankData({
                bankName, bankCode, accountName, accountNumber, accountType
            })

            await newBank.save()

            res.json({ msg: "Bank added successfully!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    deleteBank: async (req, res) => {
        try {
            await BankData.findByIdAndDelete(req.params.id)
            res.json({ msg: "Bank deleted successfully!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateBank: async (req, res) => {
        try {
            const { bankName, bankCode, accountName, accountNumber, accountType } = req.body;
            await BankData.findOneAndUpdate({ _id: req.params.id }, {
                bankName, bankCode, accountName, accountNumber, accountType
            })

            res.json({ msg: "Bank updated successfully!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default PatMethodCtrl;