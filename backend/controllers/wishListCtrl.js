import WishList from "../models/wishListModel.js";

const wishListCtrl = {
  createWishList: async (req, res) => {
    try {
      const { title, description, phone, image, fee } = req.body;
      const serviceProviderEmail = req.body.userEmail;

      const { userEmail } = req.params;

      const newWishList = new WishList({
        title,
        description,
        phone,
        image,
        userEmail,
        serviceProviderEmail,
        fee,
      });

      await newWishList.save();

      res.status(200).json({ msg: "WishList created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllWishLists: async (req, res) => {
    try {
      const { userEmail } = req.params;
      const wishLists = await WishList.find({
        userEmail,
      });

      res.status(200).json(wishLists);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteWishList: async (req, res) => {
    try {
      await WishList.findByIdAndDelete(req.params.id);

      res.status(200).json({ msg: "WishList deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default wishListCtrl;
