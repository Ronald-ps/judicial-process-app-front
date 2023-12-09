import { useParams } from "react-router-dom";
import { getClient as getClientService } from "@/services/client/adapters";
import type { Client, DetailedProcess } from "@/services/client/types";
import { useEffect, useState } from "react";
import { getProcesses } from "@/services/client/adapters";

export const ClientDetailPage = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [processes, setProcesses] = useState<DetailedProcess[]>([]);

  const clientId = useParams().clientId;
  if (!clientId)
    throw new Error(
      "Impossível acessa página sem fornecer o id do client na rota"
    );

  const getClient = async () => {
    const client = await getClientService(Number(clientId));
    setClient(client);
  };

  const getProcessesByClient = async (clientId: number) => {
    const processes = await getProcesses(clientId);
    setProcesses(processes);
  };

  useEffect(() => {
    getClient();
  }, []);

  useEffect(() => {
    if (!client) return;
    getProcessesByClient(client.id);
  }, [client]);

  return <div>este</div>;
};
