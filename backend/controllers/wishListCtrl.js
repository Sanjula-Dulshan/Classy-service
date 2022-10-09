import WishList from "../models/wishListModel.js";

const wishListCtrl = {
  createWishList: async (req, res) => {
    try {
      const { title, description, phone, image } = req.body;
      const { userEmail } = req.params;

      const newWishList = new WishList({
        title,
        description,
        phone,
        image,
        userEmail,
      });

      await newWishList.save();
      console.log(newWishList);
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
      console.log("30", req.params.userEmail);
      res.status(200).json(wishLists);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteWishList: async (req, res) => {
    console.log("deleteWishList");
    try {
      await WishList.findByIdAndDelete(req.params.id);

      res.status(200).json({ msg: "WishList deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default wishListCtrl;
