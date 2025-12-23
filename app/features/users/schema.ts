import {
  pgTable,
  uuid,
  pgSchema,
  text,
  pgEnum,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";

const users = pgSchema("auth").table("users", {
  id: uuid().primaryKey(),
});

export const roles = pgEnum("role", [
  "developer",
  "designer",
  "salesperson",
  "other",
]);

export const profiles = pgTable("profiles", {
  profile_id: uuid()
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  avatar: text(),
  name: text().notNull(),
  username: text().notNull(),
  headline: text(),
  bio: text(),
  role: roles().notNull().default("developer"),
  stats: jsonb().$type<{
    followers: number;
    following: number;
  }>(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const follows = pgTable("follows", {
  follower_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  following_id: uuid().references(() => profiles.profile_id, {
    onDelete: "cascade",
  }),
  created_at: timestamp().notNull().defaultNow(),
});
