import { defaultClient } from "@services/api";

export const getDetaildProcess = async (processId: number) => {
  const process = await defaultClient
    .get(`process/${processId}`)
    .then((r) => r.data);
  return process;
};

export const getProcesses = async (searchTerm: string) => {
  const processes = await defaultClient
    .get(`process`, {
      params: { code: searchTerm, limit: /* page_size */ "15" },
    })
    .then((r) => r.data.results);
  return processes;
};

export const constructEvolutionFileUrl = async (fileLink: string) => {
  const fileBlob = await defaultClient
    .get(fileLink, {
      responseType: "blob",
    })
    .then((r) => r.data);
  const fileUrl = window.URL.createObjectURL(fileBlob);
  return fileUrl;
};
