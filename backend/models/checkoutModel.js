import mongoose from "mongoose";
const Schema = mongoose.Schema;

const checkoutSchema = new Schema(
  {
    uid: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
    },

    mobile: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    addressLine1: {
      type: String,
      required: true,
    },

    addressLine2: {
      type: String,
      required: true,
    },

    province: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "Pending",
    },
    serviceProviderEmail: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Checkout = mongoose.model("checkout", checkoutSchema);
export default Checkout;
