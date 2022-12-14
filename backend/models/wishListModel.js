import mongoose from "mongoose";
const Schema = mongoose.Schema;

const wishListSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
    },
    userEmail: {
      type: String,
      required: true,
    },
    serviceProviderEmail: {
      type: String,
      required: true,
    },
    fee: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const WishList = mongoose.model("WishList", wishListSchema);
export default WishList;
