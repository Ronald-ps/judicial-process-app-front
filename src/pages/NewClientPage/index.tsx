import { ClientForm } from "@components/client/ClientForm";
import { Box } from "@mantine/core";
import { saveClient } from "@services/client/adapters";
import type { ClientForSave } from "@services/client/types"
import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES } from "../routers";
import { AnimationPageContainer } from "@components/generic/animation/AnimationPageContainer";

export const NewClientPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (client: ClientForSave) => {
    await saveClient(client);
    return;
  };

  return (
    <AnimationPageContainer>
      <Box pr="50px" pt="5px">
        <ClientForm
          onSubmit={handleSubmit}
          gap="50px"
          onCancel={() => {
            navigate(CLIENT_ROUTES.CLIENTS);
          }}
        />
      </Box>
    </AnimationPageContainer>
  );
};
