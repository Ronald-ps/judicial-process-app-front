import { type Honorary } from "./types";
import { defaultClient } from "@services/api";

export const getHonoraries = async (clientId: number) => {
  const honoraries: Honorary[] = await defaultClient
    .get("honorary", { params: { client: clientId } })
    .then((r) => r.data.results);
  return honoraries;
};
