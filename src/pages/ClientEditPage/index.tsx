import { ClientForm } from "@components/client/ClientForm";
import { Box } from "@mantine/core";
import { saveClient, updateClient } from "@services/client/adapters";
import type { ClientForSave, Client } from "@services/client/types";
import { useNavigate, useParams } from "react-router-dom";
import { CLIENT_ROUTES } from "../routers";
import { AnimationPageContainer } from "@components/generic/animation/AnimationPageContainer";
import { getClient as getClientService } from "@services/client/adapters";
import { useEffect, useState } from "react";
import { useNavigateWithConstructRoute } from "../hooks";

export const ClientEditPage = () => {
  const [client, setClient] = useState<Client | null>(null);
  const navigate = useNavigateWithConstructRoute();
  const clientId = useParams().clientId;
  if (!clientId) {
    throw new Error("Client id is required");
  }
  const handleSubmit = async (clientToUpdate: ClientForSave) => {
    const clientToSave = {};
    for (const key of Object.keys(clientToUpdate)) {
      if (clientToUpdate[key] !== client[key]) {
        clientToSave[key] = clientToUpdate[key];
      }
    }
    const updatedClient = await updateClient(clientToSave, clientId);
    navigate({
      routerPath: CLIENT_ROUTES.CLIENT_DETAIL,
      params: { clientId: updatedClient.id },
    });
  };
  const getClient = async () => {
    const client = await getClientService(clientId);
    setClient(client);
  };

  useEffect(() => {
    getClient();
  }, []);

  return (
    <AnimationPageContainer>
      <Box pr="50px" pt="5px">
        {client && (
          <ClientForm
            onSubmit={handleSubmit}
            gap="50px"
            onCancel={() => {
              navigate(CLIENT_ROUTES.CLIENTS);
            }}
            client={client}
          />
        )}
      </Box>
    </AnimationPageContainer>
  );
};
