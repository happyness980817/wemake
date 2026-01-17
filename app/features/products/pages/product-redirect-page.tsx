import type { Route } from "./+types/product-redirect-page";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";

export const loader = ({ params, request }: Route.LoaderArgs) => {
  const { headers } = makeSSRClient(request);
  const { productId } = params;
  return redirect(`/products/${productId}/overview`, { headers });
};
