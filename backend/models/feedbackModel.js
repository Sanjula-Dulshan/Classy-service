import mongoose from "mongoose";
const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    rating: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
