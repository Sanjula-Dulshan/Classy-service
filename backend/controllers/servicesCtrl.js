import Services from "../models/servicesModel.js";

const servicesCtrl = {
  createService: async (req, res) => {
    try {
      const {
        title,
        description,
        category,
        location,
        fee,
        needBuyerAddress,
        needDate,
        isCOD,
        isOnlinePayment,
        image,
      } = req.body;

      if (!image) return res.status(400).json({ msg: "No image uploaded" });
      const newService = new Services({
        title,
        description,
        category,
        location,
        fee,
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
};

export default servicesCtrl;
