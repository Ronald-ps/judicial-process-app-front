import {
  getContributions as getContributionsService,
  type Contribution,
} from "@services/contribution";
import { useAuth } from "@components/auth/AuthProvider";
import { useEffect, useState } from "react";
import { Box, Stack, rem } from "@mantine/core";
import { ContributionsList } from "./ContributionsList";

export const ContributionsListPage = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  const { loggedUser } = useAuth();

  const getContributions = async () => {
    const contributions = await getContributionsService(loggedUser.id);
    setContributions(contributions);
  };

  useEffect(() => {
    getContributions();
  }, [])

  return (
    <Stack gap="8px" mah="100%">
      <Box h={rem("60%")}>
       < ContributionsList contributions={contributions}/>
     </Box>
    </Stack>
  );
};
