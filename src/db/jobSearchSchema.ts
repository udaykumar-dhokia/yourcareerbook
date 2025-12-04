import { pgTable, uuid, jsonb, date } from "drizzle-orm/pg-core";
import { usersTable } from "./userSchema.js";

export const jobSearchTable = pgTable("job_search", {
  id: uuid().primaryKey().defaultRandom(),
  user: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  jobs: jsonb("jobs").$type<JobSearch>().array().default([]),
  createdAt: date().defaultNow(),
});

export type JobSearch = {
  description: string;
  location: string;
  salary: string;
  title: string;
  link: string;
  company: string;
};
