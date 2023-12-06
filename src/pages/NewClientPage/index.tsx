import { ClientForm } from "@components/client/ClientForm";
import { Box } from "@mantine/core";
import { ClientForSave, saveClient } from "@services/client";
import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES } from "../routers";
import { AnimationPageContainer } from "@components/generic/animation/AnimationPageContainer";

export const NewClientPage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (client: ClientForSave) => {
    const savedClient = await saveClient(client);
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
