import { pgTable, varchar, uuid, text } from "drizzle-orm/pg-core";
import { usersTable } from "./userSchema.js";

export const feedbackTable = pgTable("feedbacks", {
  id: uuid().primaryKey().defaultRandom(),
  user: uuid()
    .notNull()
    .references(() => usersTable.id),
  text: text().notNull(),
});
