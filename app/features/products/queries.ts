import { DateTime } from "luxon";
import client from "~/supa-client";
import { PAGE_SIZE } from "./constants";

const productColumns = `
  product_id,
  name,
  tagline,
  likes:stats->>likes,
  views:stats->>views,
  reviews:stats->>reviews
`;

export const getProductsByDateRange = async ({
  startDate,
  endDate,
  limit,
  page = 1,
}: {
  startDate: DateTime;
  endDate: DateTime;
  limit: number;
  page?: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(productColumns)
    .order("stats->>likes", { ascending: false })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO())
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw error;
  return data;
};

export const getProductsPagesByDateRange = async ({
  startDate,
  endDate,
}: {
  startDate: DateTime;
  endDate: DateTime;
}) => {
  const { count, error } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .gte("created_at", startDate.toISO())
    .lte("created_at", endDate.toISO());
  if (error) throw error;
  if (count) return Math.ceil(count / PAGE_SIZE); // 올림
  return 1;
};

export const getAllTimeProductsByLikes = async ({
  limit,
  page = 1,
}: {
  limit: number;
  page?: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(productColumns)
    .order("stats->>likes", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);
  if (error) throw error;
  return data;
};

export const getAllTimeProductsPages = async ({ limit }: { limit: number }) => {
  const { count, error } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true });
  if (error) throw error;
  if (count) return Math.ceil(count / limit);
  return 1;
};

export const getCategories = async () => {
  const { data, error } = await client
    .from("categories")
    .select(`category_id, name, description`);
  if (error) throw error;
  return data;
};

export const getCategory = async (categoryId: number) => {
  const { data, error } = await client
    .from("categories")
    .select(`category_id, name, description`)
    .eq("category_id", categoryId)
    .single();
  if (error) throw error;
  return data;
};

export const getProductsByCategory = async ({
  categoryId,
  page,
}: {
  categoryId: number;
  page: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(productColumns)
    .eq("category_id", categoryId)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw error;
  return data;
};

export const getCategoryPages = async (categoryId: number) => {
  const { count, error } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .eq("category_id", categoryId);
  if (error) throw error;
  if (count) return Math.ceil(count / PAGE_SIZE);
  return 1;
};

export const getProductsBySearch = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const { data, error } = await client
    .from("products")
    .select(productColumns)
    .or(`name.ilike.%${query}%,tagline.ilike.%${query}%`)
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw error;
  return data;
};

export const getPagesBySearch = async ({ query }: { query: string }) => {
  const { count, error } = await client
    .from("products")
    .select(`product_id`, { count: "exact", head: true })
    .or(`name.ilike.%${query}%,tagline.ilike.%${query}%`);
  if (error) throw error;
  if (count) return Math.ceil(count / PAGE_SIZE);
  return 1;
};

export const getProductById = async (productId: number) => {
  const { data, error } = await client
    .from("product_overview_view")
    .select(`*`)
    .eq("product_id", productId)
    .single();
  if (error) throw error;
  return data;
};

export const getReviews = async (productId: number) => {
  const { data, error } = await client
    .from("reviews")
    .select(
      `
      review_id,
      rating,
      review,
      created_at,
      user:profiles!inner(
      name,username,avatar
    )
      `
    )
    .eq("product_id", productId);
  if (error) throw error;
  return data;
};
