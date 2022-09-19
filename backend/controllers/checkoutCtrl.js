import Checkout from "../models/checkoutModel.js";

const checkoutCtrl = {
  getCheckouts: async (req, res) => {
    try {
      const checkouts = await Checkout.find();
      res.json(checkouts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createCheckout: async (req, res) => {
    try {
      const {
        uid,
        firstName,
        lastName,
        email,
        mobile,
        date,
        time,
        addressLine1,
        addressLine2,
        province,
        city,
        orderStatus,
        serviceProviderEmail,
        serviceTitle,
        amount,
      } = req.body;

      const newCheckout = new Checkout({
        uid,
        firstName,
        lastName,
        email,
        mobile,
        date,
        time,
        addressLine1,
        addressLine2,
        province,
        city,
        orderStatus,
        serviceProviderEmail,
        serviceTitle,
        amount,
      });

      await newCheckout.save();

      res.json({ msg: "Checkout added successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteCheckout: async (req, res) => {
    try {
      await Checkout.findByIdAndDelete(req.params.id);
      res.json({ msg: "Checkout deleted successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateCheckout: async (req, res) => {
    try {
      const { uid, name, email, address, city, country, zip, total, cart } =
        req.body;
      await Checkout.findOneAndUpdate(
        { _id: req.params.id },
        {
          uid,
          name,
          email,
          address,
          city,
          country,
          zip,
          total,
          cart,
        }
      );

      res.json({ msg: "Checkout updated successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getByUid: async (req, res) => {
    try {
      const checkouts = await Checkout.findOne({ uid: req.params.uid });
      res.json(checkouts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateServiceStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log("id", id);
      console.log("status", status);
      const data = await Checkout.findOneAndUpdate(
        { _id: id },
        { orderStatus: status }
      );
      res.status(200).json({ msg: "Order status updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getPendingServices: async (req, res) => {
    try {
      const { userEmail } = req.params;

      const services = await Checkout.find({
        serviceProviderEmail: userEmail,
        orderStatus: "Pending",
      });

      res.status(200).json(services);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default checkoutCtrl;
