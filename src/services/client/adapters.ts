import { defaultClient } from "@services/api";
import type {
  Client,
  ClientForSave,
  DetailedProcess,
  Evolution,
  SimpleProcess,
} from "./types";

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

export const getSimpleProcesses = async (clientId: number | string) => {
  const process: SimpleProcess[] = await defaultClient
    .get(`client/${clientId}/legal-process/simple`)
    .then(({ data }) => data);
  return process;
};

export const evolutionCreate = async (
  processId: number | string,
  description: string
) => {
  const evolutionCreated: Evolution = await defaultClient
    .post(`evolution`, { description, process_id: processId })
    .then(({ data }) => data);
  return evolutionCreated;
};

export const observationCreate = async (
  processId: number | string,
  description: string
) => {
  const observationCreated: Evolution = await defaultClient
    .post(`observation`, { description, process_id: processId })
    .then(({ data }) => data);
  return observationCreated;
};
