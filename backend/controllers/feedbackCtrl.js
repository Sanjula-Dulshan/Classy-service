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
  updateFeedback: async (req, res) => {
    try {
      const { rating, comment } = req.body;
      await Feedback.findOneAndUpdate(
        { _id: req.params.id },
        {
          rating,
          comment,
        }
      );

      res.status(200).json({ msg: "Feedback updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteFeedback: async (req, res) => {
    try {
      await Feedback.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "Feedback deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default feedbackCtrl;
