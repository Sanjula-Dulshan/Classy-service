import WishList from "../models/wishListModel.js";

const wishListCtrl = {
  createWishList: async (req, res) => {
    try {
      const { title, description, phone, image } = req.body;

      const newWishList = new WishList({
        title,
        description,
        phone,
        image,
      });

      await newWishList.save();
      res.status(200).json({ msg: "WishList created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAllWishLists: async (req, res) => {
    try {
      const wishLists = await WishList.find();
      res.status(200).json(wishLists);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default wishListCtrl;
