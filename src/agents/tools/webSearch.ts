import { tool } from "langchain";
import z from "zod";

export const getJobs = tool(
  async (input: { query: string }) => {
    const myHeaders = new Headers();
    myHeaders.append("X-API-KEY", process.env.SERPER_API_KEY || "");
    myHeaders.append("Content-Type", "application/json");

    const excludedSites = [
      "linkedin.com",
      "indeed.com",
      "glassdoor.com",
      "monster.com",
      "simplyhired.com",
      "ziprecruiter.com",
      "naukri.com",
      "foundit.in",
    ];
    const exclusionQuery = excludedSites
      .map((site) => `-site:${site}`)
      .join(" ");

    const refinedQuery = `${input.query} careers "apply now" -job -board ${exclusionQuery}`;

    const raw = JSON.stringify({
      q: refinedQuery,
      num: 10,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };

    try {
      const response = await fetch(
        "https://google.serper.dev/search",
        requestOptions
      );
      const result = await response.json();

      const jobs =
        result.organic?.map((item: any) => ({
          title: item.title,
          link: item.link,
          snippet: item.snippet,
        })) || [];

      return JSON.stringify(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return "Failed to fetch job opportunities.";
    }
  },
  {
    name: "getJobs",
    description:
      "Use this tool to get the list of best job opportunities for the given user based on their skills and experience. It searches directly for company career pages.",
    schema: z.object({
      query: z
        .string()
        .describe(
          "The query to search for job opportunities, e.g., 'Software Engineer jobs in Bangalore'."
        ),
    }),
  }
);
