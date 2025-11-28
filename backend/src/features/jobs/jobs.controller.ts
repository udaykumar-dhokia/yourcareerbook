import { and, eq } from "drizzle-orm";
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
        .json({ message: "Internal Server Error", error });
    }
  },

  update: async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const {
      id,
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

    if (!id) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Missing job ID" });
    }

    try {
      const updateData = {
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
      };

      Object.keys(updateData).forEach(
        (key) => updateData[key] === undefined && delete updateData[key]
      );

      const [updatedJob] = await db
        .update(jobTable)
        .set(updateData)
        .where(and(eq(jobTable.id, id), eq(jobTable.user, userId)))
        .returning();

      if (!updatedJob) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Unauthorized" });
      }

      return res
        .status(HttpStatus.OK)
        .json({ message: "Job updated successfully", job: updatedJob });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", error });
    }
  },

  delete: async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const { id } = req.body;
    if (!id) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Missing required fields" });
    }

    try {
      await db
        .delete(jobTable)
        .where(and(eq(jobTable.id, id), eq(jobTable.user, userId)));
      return res
        .status(HttpStatus.OK)
        .json({ message: "Job delete successfully" });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", error });
    }
  },

  getJobsByUser: async (req, res) => {
    const userId = req.userId;
    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }
    try {
      const jobs = await db
        .select()
        .from(jobTable)
        .where(eq(jobTable.user, userId));
      return res.status(HttpStatus.OK).json({ jobs });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", error });
    }
  },
};

export default jobsController;
