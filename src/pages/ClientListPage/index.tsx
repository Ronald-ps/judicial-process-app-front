import { getClients as getClientsService, type Client } from "@services/client";
import { useEffect, useState } from "react";
import { Box, Stack, rem } from "@mantine/core";
import { ClientsList } from "./ClientsList";

export const ClientListPage = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const getClients = async () => {
    const clients = await getClientsService();
    setClients(clients);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Stack gap="8px" mah="100%">
      <Box h={rem("60%")}>
        <ClientsList clients={clients} />
      </Box>
    </Stack>
  );
};
