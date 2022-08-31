import Services from "../models/servicesModel.js";

const servicesCtrl = {
  createService: async (req, res) => {
    try {
      const {
        userEmail,
        title,
        description,
        category,
        location,
        fee,
        phone,
        needBuyerAddress,
        needDate,
        isCOD,
        isOnlinePayment,
        image,
      } = req.body;

      if (!image) return res.status(400).json({ msg: "No image uploaded" });
      const newService = new Services({
        userEmail,
        title,
        description,
        category,
        location,
        fee,
        phone,
        needBuyerAddress,
        needDate,
        isCOD,
        isOnlinePayment,
        image,
      });

      await newService.save();
      res.status(200).json({ msg: "Service created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getServices: async (req, res) => {
    try {
      const services = await Services.find();
      res.status(200).json(services);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserServices: async (req, res) => {
    try {
      const { userEmail } = req.params;
      const services = await Services.find({ userEmail });
      res.status(200).json(services);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default servicesCtrl;
