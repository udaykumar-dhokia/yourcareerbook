import {
  pgTable,
  varchar,
  uuid,
  text,
  pgEnum,
  date,
  decimal,
} from "drizzle-orm/pg-core";
import { usersTable } from "./userSchema.js";

export const phase = pgEnum("phase", [
  "Applied",
  "Test/OA",
  "Interview",
  "Offer",
  "Rejected",
]);

export const jobTable = pgTable("jobs", {
  id: uuid().primaryKey().defaultRandom(),
  user: uuid()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  company: varchar({ length: 255 }).notNull(),
  jobRole: varchar({ length: 255 }).notNull(),
  phase: phase().notNull(),
  jobDescriptionLink: varchar({ length: 255 }),
  salary: decimal(),
  companyWebsite: varchar({ length: 255 }),
  remark: text(),
  contactName: varchar({ length: 255 }),
  contactEmail: varchar({ length: 255 }),
  linkedinUrl: varchar({ length: 255 }),
  interviewDate: date(),
});

export type TJob = typeof jobTable.$inferSelect;
