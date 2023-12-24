import { type Honorary } from "./types";
import { defaultClient } from "@services/api";

export const getHonararies = (clientId: number) => {
  const honorary: Honorary = defaultClient
    .get("honorary", { params: { client: clientId } })
    .then((r) => r.data);
  return honorary;
};
