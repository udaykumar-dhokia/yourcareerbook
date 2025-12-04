import {
  pgTable,
  varchar,
  uuid,
  boolean,
  jsonb,
  text,
  date,
  integer,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  username: text().notNull().unique(),
  fullName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  mobile: varchar({ length: 255 }),
  city: varchar({ length: 255 }),
  state: varchar({ length: 255 }),
  country: varchar({ length: 255 }),
  summary: varchar({ length: 255 }),
  gridOrTable: boolean().default(true),
  socialLinks: jsonb("socialLinks").$type<SocialLinks>().default({}),
  skills: varchar({ length: 255 }).array().default([]),
  appliedDate: date().defaultNow(),
  jobSearchLimit: integer().default(4),
});

export type SocialLinks = {
  linkedin?: string;
  github?: string;
  porfolio?: string;
};
