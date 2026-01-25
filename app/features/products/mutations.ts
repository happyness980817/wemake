import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const createProductReview = async (
  client: SupabaseClient<Database>,
  {
    productId,
    rating,
    review,
    userId,
  }: {
    productId: string;
    rating: number;
    review: string;
    userId: string;
  },
) => {
  const { error } = await client.from("reviews").insert({
    product_id: Number(productId),
    rating,
    review,
    profile_id: userId,
  });
  if (error) throw error;
};
