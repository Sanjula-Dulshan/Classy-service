import mongoose from "mongoose";
const Schema = mongoose.Schema;

const servicesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
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
  },
  {
    timestamps: true,
  }
);

const Services = mongoose.model("Services", servicesSchema);
export default Services;
