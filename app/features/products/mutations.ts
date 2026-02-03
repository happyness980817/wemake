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

export const createProduct = async (
  client: SupabaseClient<Database>,
  {
    name,
    tagline,
    description,
    howItWorks,
    icon,
    url,
    categoryId,
    userId,
  }: {
    name: string;
    tagline: string;
    description: string;
    howItWorks: string;
    icon: string;
    url: string;
    categoryId: number;
    userId: string;
  },
) => {
  const { data, error } = await client
    .from("products")
    .insert({
      name,
      tagline,
      description,
      how_it_works: howItWorks,
      icon,
      url,
      category_id: categoryId,
      profile_id: userId,
    })
    .select("product_id")
    .single();
  if (error) throw error;
  return data.product_id;
};
