import db from "../../config/db.config.js";
import { feedbackTable } from "../../db/feedbackSchema.js";
import { HttpStatus } from "../../utils/httpStatus.js";

const feedbackController = {
  create: async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const { text } = req.body;
    if (!text) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Missing required fields" });
    }

    try {
      await db.insert(feedbackTable).values({
        user: userId,
        text: text,
      });

      return res
        .status(HttpStatus.OK)
        .json({ message: "Feedback submitted successfully" });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", error });
    }
  },
};

export default feedbackController;
