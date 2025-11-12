import { redirect } from "react-router";
import type { Route } from "./+types/leaderboards-redirection-page";
import { DateTime } from "luxon";

export function loader({ params }: Route.LoaderArgs) {
  // type Route.LoaderArgs = {request: Request; params: { period: string }; context: MiddlewareEnabled extends true ? Readonly<RouterContextProvider> : AppLoadContext;  }
  const { period } = params; // type safety - routes.ts 에서 정의한 타입을 사용하여 타입 안전성을 보장. 자동으로 타입 추론.
  let url: string;
  const today = DateTime.now().setZone("Asia/Seoul");
  if (period === "daily") {
    url = `/products/leaderboards/daily/${today.year}/${today.month}/${today.day}`;
  } else if (period === "weekly") {
    url = `/products/leaderboards/weekly/${today.year}/${today.weekNumber}`;
  } else if (period === "monthly") {
    url = `/products/leaderboards/monthly/${today.year}/${today.month}`;
  } else if (period === "yearly") {
    url = `/products/leaderboards/yearly/${today.year}`;
  } else {
    return new Response("Not Found", { status: 404 });
  }
  return redirect(url);
}
