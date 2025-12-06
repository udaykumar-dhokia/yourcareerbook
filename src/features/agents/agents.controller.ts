import { eq } from "drizzle-orm";
import { jobAgent } from "../../agents/agent.js";
import db from "../../config/db.config.js";
import { usersTable } from "../../db/userSchema.js";
import { HttpStatus } from "../../utils/httpStatus.js";
import { jobSearchTable } from "../../db/jobSearchSchema.js";

const agentsController = {
  getJobs: async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }
    try {
      const jobs = await db
        .select()
        .from(jobSearchTable)
        .where(eq(jobSearchTable.user, userId));
      return res.status(HttpStatus.OK).json(jobs);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", error });
    }
  },

  findJobs: async (req, res) => {
    const userId = req.userId;
    const { query } = req.body;

    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    if (!query) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Query is required" });
    }

    try {
      const user = await db
        .select({ jobSearchLimit: usersTable.jobSearchLimit })
        .from(usersTable)
        .where(eq(usersTable.id, userId));

      console.log(user);

      if (!user.length) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "User not found" });
      }

      if (user[0].jobSearchLimit <= 0) {
        return res
          .status(HttpStatus.FORBIDDEN)
          .json({ message: "You have used your free tier" });
      }

      const finalOutput = await jobAgent.invoke({
        messages: [{ role: "user", content: query }],
      });

      if (
        !finalOutput ||
        !finalOutput.structuredResponse ||
        !finalOutput.structuredResponse.jobs ||
        finalOutput.structuredResponse.jobs.length === 0
      ) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message:
            "No job results found or agent failed to respond meaningfully",
        });
      }

      console.log(finalOutput.structuredResponse);

      await db
        .update(usersTable)
        .set({ jobSearchLimit: user[0].jobSearchLimit - 1 })
        .where(eq(usersTable.id, userId));

      const [job] = await db
        .insert(jobSearchTable)
        .values({
          user: userId,
          jobs: finalOutput.structuredResponse.jobs,
        })
        .returning();

      console.log(job);

      return res.status(HttpStatus.OK).json({ job });
    } catch (error) {
      console.log(error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", error });
    }
  },
};

export default agentsController;
