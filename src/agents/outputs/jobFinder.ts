import z from "zod";

const jobFinderOutput = z.object({
  jobs: z.array(
    z.object({
      title: z.string().describe("The title of the job."),
      company: z.string().describe("The company offering the job."),
      location: z.string().describe("The location of the job."),
      description: z.string().describe("The description of the job."),
      salary: z.string().describe("The salary of the job."),
      link: z.string().describe("The link to the job."),
    })
  ),
});

export default jobFinderOutput;
