import client from "~/supa-client";

export const getIdeas = async ({ limit }: { limit: number }) => {
  const { data, error } = await client
    .from("ideas_view")
    .select("*")
    .limit(limit);
  if (error) throw error;
  return data;
};

export const getIdea = async (ideaId: string) => {
  const { data, error } = await client
    .from("ideas_view")
    .select("*")
    .eq("idea_id", parseInt(ideaId))
    .single();
  if (error) throw error;
  return data;
};
