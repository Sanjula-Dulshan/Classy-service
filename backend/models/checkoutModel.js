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
    image: {
      type: Object,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "pending",
    },
    serviceProviderEmail: {
      type: String,
      trim: true,
      required: true,
    },
    serviceTitle: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    feedbackStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Checkout = mongoose.model("checkout", checkoutSchema);
export default Checkout;
