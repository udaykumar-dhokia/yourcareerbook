import { eq } from "drizzle-orm";
import db from "../../config/db.config.js";
import { jobTable } from "../../db/jobSchema.js";
import { HttpStatus } from "../../utils/httpStatus.js";
import emailAgent from "../../agents/email.agent.js";

const folloUpController = {
  create: async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const { jobId } = req.body;
    if (!jobId) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Missing required fields" });
    }
    try {
      const job = await db
        .select()
        .from(jobTable)
        .where(eq(jobTable.id, jobId));

      if (job.length == 0) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "No such job found" });
      }

      const text = await emailAgent(job[0]);
      return res.status(HttpStatus.OK).json({ text });
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", error });
    }
  },
};

export default folloUpController;
