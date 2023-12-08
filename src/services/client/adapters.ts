import { defaultClient } from "@services/api";
import { Client, ClientForSave } from "./types";

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
