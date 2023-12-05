import { getClients as getClientsService, type Client } from "@services/client";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Input, Stack, Text, rem } from "@mantine/core";
import { ClientsList } from "./ClientsList";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES } from "../routers";

export const ClientListPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loadingNewClient, setLoadingNewClient] = useState(false);

  const getClients = async (search_term?: string) => {
    const clients = await getClientsService({ name: search_term });
    setClients(clients);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Stack gap="8px" h="100%">
      <Stack h={rem("88%")} w="100%" align="center">
        <Stack w="80%" h="100%" gap="24px">
          <Text size="xl" fw={600}>
            Clientes
          </Text>
          <Stack w="100%">
            <Flex w="100%" justify={"space-between"}>
              <Input
                w="68%"
                placeholder="Pesquisar..."
                leftSection={<IconSearch size={16} />}
                onChange={(e) => getClients(e.target.value)}
              />
              <Button
                w="30%"
                onClick={() => {
                  setLoadingNewClient(true);
                  setTimeout(() => {
                    navigate(CLIENT_ROUTES.NEW_CLIENT);
                  }, 1200);
                }}
                loading={loadingNewClient}
              >
                Adicionar cliente
              </Button>
            </Flex>
            <Box h="98%">
              <ClientsList clients={clients} />
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
