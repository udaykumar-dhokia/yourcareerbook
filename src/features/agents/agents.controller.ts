import { eq } from "drizzle-orm";
import { jobAgent } from "../../agents/agent.js";
import db from "../../config/db.config.js";
import { usersTable } from "../../db/userSchema.js";
import { HttpStatus } from "../../utils/httpStatus.js";
import { jobSearchTable } from "../../db/jobSearchSchema.js";

const agentsController = {
  findJobs: async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }
    try {
      const user = await db
        .select({ limit: usersTable.jobSearchLimit })
        .from(usersTable)
        .where(eq(usersTable.id, userId));

      if (!user) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "User not found" });
      }

      if (user[0].limit <= 0) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "You have used your free tier" });
      }

      await db
        .update(usersTable)
        .set({ jobSearchLimit: user[0].limit - 1 })
        .where(eq(usersTable.id, userId));

      const result = await jobAgent.invoke({
        messages: [
          {
            role: "user",
            content: "Find me the jobs for Full Stack Developer in Ahmedabad.",
          },
        ],
      });

      await db.insert(jobSearchTable).values({
        user: userId,
        jobs: result.structuredResponse.jobs,
      });

      return res.status(HttpStatus.OK).json(result.structuredResponse.jobs);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", error });
    }
  },
};

export default agentsController;
