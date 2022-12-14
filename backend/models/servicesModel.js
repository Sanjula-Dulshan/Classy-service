import mongoose from "mongoose";
const Schema = mongoose.Schema;

const servicesSchema = new Schema(
  {
    userEmail: {
      type: String,
      trim: true,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    needBuyerAddress: {
      type: Boolean,
      default: false,
    },
    needDate: {
      type: Boolean,
      default: false,
    },
    isCOD: {
      type: Boolean,
      default: false,
    },
    isOnlinePayment: {
      type: Boolean,
      default: false,
    },
    image: {
      type: Object,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Services = mongoose.model("Services", servicesSchema);
export default Services;
