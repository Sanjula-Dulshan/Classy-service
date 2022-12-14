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
  getAllOrders: async (req, res) => {
    try {
      const { userEmail } = req.params;
      const checkouts = await Checkout.find({
        uid: userEmail,
      });
      res.status(200).json(checkouts);
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
        image,
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

        image,
      });

      await newCheckout.save();

      res.json({ msg: "Checkout added successfully!", id: newCheckout._id });
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

  updateFeedbackStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { feedbackStatus } = req.body;

      const data = await Checkout.findOneAndUpdate(
        { _id: id },
        { feedbackStatus: feedbackStatus }
      );

      res.status(200).json({ msg: "Feedback status updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //get orders by service provider email
  getOrdersByServiceProviderEmail: async (req, res) => {
    try {
      const { serviceProviderEmail } = req.params;

      const orders = await Checkout.find({
        serviceProviderEmail: serviceProviderEmail,
      });

      res.status(200).json(orders);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //mongo pipeline to get documents where orderID in feedback  match _id in checkout
  getFeedbacks: async (req, res) => {
    try {
      const { serviceProviderEmail } = req.params;
      console.log("serviceProviderEmail", serviceProviderEmail);

      const feedbacks = await Checkout.aggregate([
        { $match: { "serviceProviderEmail": serviceProviderEmail } },
        {
          $lookup: {
            from: "feedbacks",
            localField: "_id",
            foreignField: "orderID",
            as: "feedback",
          },
        },
        { $match: { feedback: { $ne: [] } } },
        
      ]);
      //print feedbacks cursor data in console
      console.log("feedbacks", feedbacks);

      feedbacks.forEach(doc => console.log(doc));
     

     
      res.status(200).json(feedbacks);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default checkoutCtrl;
