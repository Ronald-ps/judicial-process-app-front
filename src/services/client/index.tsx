import { defaultClient } from "@services/api";

export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  phone: string;
  cellphone: string;
  email: string;
  father_name: string;
  mother_name: string;
  childrens_quantity: number;
  education_level: string;
  profession: string;
  marital_status: string;
  city: string;
}
export const getClients = async (): Promise<Client[]> => {
  const clients: Client[] = await defaultClient
    .get(`client`)
    .then((r) => r.data);
  return clients;
};
