import { defaultClient } from "@services/api";

export const getDetaildProcess = async (processId: number) => {
  const process = await defaultClient
    .get(`process/${processId}`)
    .then((r) => r.data);
  return process;
};
