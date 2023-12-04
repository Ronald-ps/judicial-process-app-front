import { getClients as getClientsService, type Client } from "@services/client";
import { useEffect, useState } from "react";
import { Box, Input, Stack, rem } from "@mantine/core";
import { ClientsList } from "./ClientsList";
import { IconSearch } from "@tabler/icons-react";

export const ClientListPage = () => {
  const [clients, setClients] = useState<Client[]>([]);

  const getClients = async (search_term?: string) => {
    const clients = await getClientsService({});
    setClients(clients);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Stack gap="8px" mah="100%">
      <Input
        placeholder="Your email"
        leftSection={<IconSearch size={16} />}
        onChange={(e) => getClients(e.currentTarget.value)}
      />
      <Box h={rem("60%")}>
        <ClientsList clients={clients} />
      </Box>
    </Stack>
  );
};
