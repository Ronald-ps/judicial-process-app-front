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

export const updateClient = async (
  client: ClientForSave,
  clientId: number | string
): Promise<Client> => {
  const updatedClient: Client = await defaultClient
    .patch(`client/${clientId}`, client, {
      headers: { "Content-Type": "application/json" },
    })
    .then((r) => r.data);
  return updatedClient;
};

export const getClient = async (clientId: number | string) => {
  const client: Client = await defaultClient
    .get(`client/${clientId}`)
    .then(({ data }) => data);
  return client;
};

export const getProcesses = async (clientId: number) => {
  const process: DetailedProcess[] = await defaultClient
    .get(`client/${clientId}/legal-process`)
    .then(({ data }) => data);
  return process;
};

export const getSimpleProcesses = async (clientId: number) => {
  const process: DetailedProcess[] = await defaultClient
    .get(`client/${clientId}/legal-process/simple`)
    .then(({ data }) => data);
  return process;
};
