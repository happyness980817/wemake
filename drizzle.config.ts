// drizzle kit looks for this file to get its configuration options
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/features/**/schema.ts", // defines db columns
  out: "./app/migrations", // where Drizzle Kit will save the migration files
  // Drizzle Kit이 스키마 변경을 감지하면 (그 변화를 db 에 반영할) SQL(또는 메타) 마이그레이션 파일을 생성해 저장
  // migration: DB 스키마 변경 이력(버전)을 코드/파일로 기록하고, 그 기록대로 DB를 단계적으로 업데이트
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
