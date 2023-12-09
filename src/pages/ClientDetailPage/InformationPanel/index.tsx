import type { Client } from "@services/client/types";

interface InformationPanelProps {
  client: Client;
}
export const InformationPanel = (props: InformationPanelProps) => {
  const { client } = props;
  return (
    <div>
      <h1>Informações pessoais</h1>
      <p>Nome: {client.name}</p>
      <p>CPF: {client.cpf}</p>
      <p>RG: {client.rg}</p>
      <p>Telefone: {client.phone}</p>
      <p>Email: {client.email}</p>
      <p>Endereço: {client.address}</p>
    </div>
  );
};
