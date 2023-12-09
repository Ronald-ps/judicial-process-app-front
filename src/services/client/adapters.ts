import { defaultClient } from "@services/api";
import type { Client, ClientForSave, DetailedProcess } from "./types";

export const getClients = async ({
  name,
}: {
  name?: string;
}): Promise<Client[]> => {
  const clients: Client[] = await defaultClient
    .get(`client`, { params: { name: name || "" } })
    .then((r) => r.data);
  return clients;
};

export const saveClient = async (client: ClientForSave): Promise<Client> => {
  const savedClient: Client = await defaultClient
    .post(`client`, client)
    .then((r) => r.data);
  return savedClient;
};

export const getClient = async (clientId: number) => {
  const client: Client = await defaultClient.get(`client/${clientId}`).then(({ data }) => data)
  return client
}

export const getProcesses = async (clientId: number) => {
  const process: DetailedProcess[] = await defaultClient.get(`client/${clientId}/process`).then(({ data }) => data)
  return process
}
