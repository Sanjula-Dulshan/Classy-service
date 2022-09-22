import Feedback from "../models/feedbackModel.js";

const feedbackCtrl = {
  createFeedback: async (req, res) => {
    try {
      const { rating, comment } = req.body;

      const newFeedback = new Feedback({
        rating,
        comment,
      });

      await newFeedback.save({ _id: req.params.id });

      res.status(200).json({ msg: "Feedback created" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default feedbackCtrl;
