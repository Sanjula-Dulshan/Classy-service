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
    console.log("In ctrl ",req.body);
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
      });

      await newCheckout.save();
      console.log("save success");
      res.json({ msg: "Checkout added successfully!" });
    } catch (err) {
      console.log(err.message);
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
        }
      );

      res.json({ msg: "Checkout updated successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getByUid: async (req, res) => {
    try {
      const checkouts = await Checkout.find({ uid: req.params.uid });
      res.json(checkouts);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateServiceStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
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
        orderStatus: "pending",
      });

      res.status(200).json(services);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAcceptedServices: async (req, res) => {
    try {
      const { userEmail } = req.params;

      const services = await Checkout.find({
        serviceProviderEmail: userEmail,
        orderStatus: "accept",
      });

      res.status(200).json(services);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getRejectedServices: async (req, res) => {
    try {
      const { userEmail } = req.params;

      const services = await Checkout.find({
        serviceProviderEmail: userEmail,
        orderStatus: "reject",
      });

      res.status(200).json(services);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};



export default checkoutCtrl;
