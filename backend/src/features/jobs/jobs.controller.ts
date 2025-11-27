import db from "../../config/db.config";
import { jobTable } from "../../db/jobSchema";
import { HttpStatus } from "../../utils/HttpStatus";

const jobsController = {
  create: async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const {
      company,
      jobRole,
      phase,
      jobDescriptionLink,
      salary,
      companyWebsite,
      remark,
      contactName,
      contactEmail,
      linkedinUrl,
      interviewDate,
    } = req.body;

    if (!company || !jobRole || !phase) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Missing required fields" });
    }

    try {
      const [job] = await db
        .insert(jobTable)
        .values({
          company: company,
          jobRole: jobRole,
          phase: phase,
          user: userId,
          companyWebsite: companyWebsite,
          contactEmail: contactEmail,
          contactName: contactName,
          salary: salary,
          interviewDate: interviewDate,
          jobDescriptionLink: jobDescriptionLink,
          linkedinUrl: linkedinUrl,
          remark: remark,
        })
        .returning();

      return res
        .status(HttpStatus.CREATED)
        .json({ message: "Job added successfully", job });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  },
};

export default jobsController;
