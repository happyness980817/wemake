import { Outlet, data } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/leaderboard-layout";
import { makeSSRClient } from "~/supa-client";

const searchParamsSchema = z.object({
  page: z.coerce.number().min(1).optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { headers } = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(
    Object.fromEntries(url.searchParams)
  );
  if (!success) {
    throw data(
      {
        error_code: "invalid_page",
        message: "Invalid page",
      },
      { status: 400 }
    );
  }
  return data({ page: parsedData.page }, { headers });
};

export default function LeaderboardLayout() {
  return <Outlet />;
}
