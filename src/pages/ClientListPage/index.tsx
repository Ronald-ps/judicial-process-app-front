import { getClients as getClientsService, type Client } from "@services/client";
import { useEffect, useState } from "react";
import { Box, Input, Stack, rem } from "@mantine/core";
import { ClientsList } from "./ClientsList";
import { IconSearch } from "@tabler/icons-react";

export const ClientListPage = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const getClients = async (search_term?: string) => {
    const clients = await getClientsService({ name: search_term });
    setClients(clients);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Stack gap="8px" h="100%">
      <Input
        placeholder="Your email"
        leftSection={<IconSearch size={16} />}
        onChange={(e) => getClients(e.target.value)}
      />
      <Box h={rem("95%")}>
        <ClientsList clients={clients} />
      </Box>
    </Stack>
  );
};
