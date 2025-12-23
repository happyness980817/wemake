import {
  bigint,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  primaryKey,
  integer,
  check,
} from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";
import { sql } from "drizzle-orm";

export const products = pgTable("products", {
  product_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  name: text().notNull(),
  tagline: text().notNull(),
  description: text().notNull(),
  how_it_works: text().notNull(),
  icon: text().notNull(),
  url: text().notNull(),
  stats: jsonb().notNull().default({ views: 0, reviews: 0 }),
  profile_id: uuid()
    .references(() => profiles.profile_id, {
      onDelete: "cascade",
    })
    .notNull(),
  category_id: bigint({ mode: "number" }).references(
    () => categories.category_id,
    {
      onDelete: "set null", // category 없이도 제품은 존재할 수 있다.
    }
  ),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const categories = pgTable("categories", {
  category_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  name: text().notNull(),
  description: text().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});

export const product_likes = pgTable(
  "product_likes",
  {
    product_id: bigint({ mode: "number" }).references(
      () => products.product_id,
      {
        onDelete: "cascade",
      }
    ), // product 삭제 시 like도 삭제
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }), // profile 삭제 시 like도 삭제
  },
  (table) => [primaryKey({ columns: [table.product_id, table.profile_id] })]
);

/* composite primary key : 
  - 유저 1 - 제품 5 라 하면, 유저 1이 제품 5를 단 한 번만 '좋아요' 할 수 있다. 
  - product_id, profile_id 의 조합이 unique 해야 한다.
*/

export const reviews = pgTable(
  "reviews",
  {
    review_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    product_id: bigint({ mode: "number" }).references(
      () => products.product_id,
      {
        onDelete: "cascade",
      }
    ),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    rating: integer().notNull(),
    review: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  (table) => [check("rating_check", sql`${table.rating} BETWEEN 1 AND 5`)]
);
