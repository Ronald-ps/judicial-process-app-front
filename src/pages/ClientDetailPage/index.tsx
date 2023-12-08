import { useParams } from "react-router-dom";
import { getClient as getClientService } from "@/services/client/adapters";
import { Client } from "@/services/client/types";
import { useEffect, useState } from "react";

export const ClientDetailPage = () => {
  const [client, setClient] = useState<Client | null>(null);

  const clientId = useParams().clientId;
  if (!clientId)
    throw new Error(
      "Impossível acessa página sem fornecer o id do client na rota"
    );

  const getClient = async () => {
    const client = await getClientService(Number(clientId));
    setClient(client)
  };

  useEffect(() => {
    getClient()
  }, [])

  return <div>este</div>;
};
