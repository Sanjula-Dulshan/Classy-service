import Checkout from "../models/checkoutModel";

const checkoutCtrl = {
    getCheckouts: async (req, res) => {
        try {
            const checkouts = await Checkout.find();
            res.json(checkouts);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    createCheckout: async (req, res) => {
        try {
            const { uid, name, email, address, city, country, zip, total, cart } = req.body;
            const user = await Checkout.findOne({ uid })
            if (user) return res.status(400).json({ msg: "This checkout already exists." })

            const newCheckout = new Checkout({
                uid, name, email, address, city, country, zip, total, cart
            })

            await newCheckout.save()

            res.json({ msg: "Checkout added successfully!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    deleteCheckout: async (req, res) => {
        try {
            await Checkout.findByIdAndDelete(req.params.id)
            res.json({ msg: "Checkout deleted successfully!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    updateCheckout: async (req, res) => {
        try {
            const { uid, name, email, address, city, country, zip, total, cart } = req.body;
            await Checkout.findOneAndUpdate({ _id: req.params.id }, {
                uid, name, email, address, city, country, zip, total, cart
            })

            res.json({ msg: "Checkout updated successfully!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getByUid: async (req, res) => {
        try {
            const checkouts = await Checkout.findOne({ uid: req.params.uid });
            res.json(checkouts);
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default checkoutCtrl;