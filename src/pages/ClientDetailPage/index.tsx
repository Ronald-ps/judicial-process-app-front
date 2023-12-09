import { useParams } from "react-router-dom";
import { getClient as getClientService } from "@/services/client/adapters";
import type { Client, DetailedProcess } from "@/services/client/types";
import { useEffect, useState } from "react";
import { getProcesses } from "@/services/client/adapters";
import { Stack, Tabs, rem } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { IconMessageCircle } from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
import { InformationPanel } from "./InformationPanel";
import { ProcessesPanel } from "./ProcessesPanel";

export const ClientDetailPage = () => {
  const [client, setClient] = useState<Client | null>(null);
  const [processes, setProcesses] = useState<DetailedProcess[]>([]);

  const iconStyle = { width: rem(12), height: rem(12) };

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

  return (
    <Stack>
      <Tabs defaultValue="information">
        <Tabs.List>
          <Tabs.Tab
            value="information"
            leftSection={<IconPhoto style={iconStyle} />}
          >
            Informações pessoais
          </Tabs.Tab>
          <Tabs.Tab
            value="processes"
            leftSection={<IconMessageCircle style={iconStyle} />}
          >
            Processos
          </Tabs.Tab>
          <Tabs.Tab
            value="evolutionAdnObservations"
            leftSection={<IconSettings style={iconStyle} />}
          >
            Evoluções e observações
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="information">
          {client && <InformationPanel client={client} />}
        </Tabs.Panel>

        <Tabs.Panel value="processes">
          <ProcessesPanel processes={processes || []}/>
        </Tabs.Panel>

        <Tabs.Panel value="evolutionAdnObservations">
          Settings tab content
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
