import { sql } from "drizzle-orm";
import {
  bigint,
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { PRODUCT_STAGES } from "./constants";

export const productStages = pgEnum(
  "team_stage",
  PRODUCT_STAGES.map((stage) => stage.value) as [string, ...string[]] // pgEnum 은 1개 이상의 string이 있는 배열(튜플)을 요구
);

export const team = pgTable(
  "team",
  {
    team_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    team_size: integer().notNull(),
    product_name: text().notNull(),
    product_stage: productStages().notNull(),
    product_description: text().notNull(),
    equity: integer().notNull(),
    roles: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    check("team_size_check", sql`${table.team_size} BETWEEN 1 AND 100`),
    check("equity_check", sql`${table.equity} BETWEEN 0 AND 100`),
    check(
      "product_description_check",
      sql`LENGTH(${table.product_description}) <= 200`
    ),
  ]
);
