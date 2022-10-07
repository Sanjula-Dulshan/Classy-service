import Feedback from "../models/feedbackModel.js";

const feedbackCtrl = {
  createFeedback: async (req, res) => {
    try {
      const { rating, comment, orderID } = req.body;

      const newFeedback = new Feedback({
        rating,
        comment,
        orderID,
      });

      await newFeedback.save();

      res.status(200).json({ msg: "Feedback created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllFeedbacks: async (req, res) => {
    try {
      const feedbacks = await Feedback.find();
      res.status(200).json(feedbacks);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default feedbackCtrl;
