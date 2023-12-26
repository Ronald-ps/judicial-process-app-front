import { useParams } from "react-router-dom";
import { type DetailedProcess } from "@services/process/types";
import { useEffect, useState } from "react";
import { getDetaildProcess } from "@services/process/adapters";
import { Group, Stack, Text, Title } from "@mantine/core";
import { ClientInfoShow } from "@/components/client/ClientInfoShow";
import { EvolutionTimeline } from "@/components/process/EvolutionTimeline";
import { ObservationTimeline } from "@/components/process/ObservationTimeline";
import { HonorariesTable } from "@/components/financial/HonorariesTable";
import { PageDefaultMarginsContainer } from "@/pages/PageDefaultMarginsContainer";
import { useNavigateWithConstructRoute } from "@/pages/hooks";
import { ROUTER_PATHS } from "@/pages/routers";
import { AnimationPageContainer } from "@components/generic/animation/AnimationPageContainer";

export const ProcessDetailPage = () => {
  const [process, setProcess] = useState<null | DetailedProcess>(null);

  const processId = useParams().processId;
  if (!processId) {
    throw new Error("Nenhum id de processo passado");
  }

  const navigate = useNavigateWithConstructRoute();

  const getProcess = async () => {
    const process: DetailedProcess = await getDetaildProcess(processId);
    setProcess(process);
  };

  useEffect(() => {
    getProcess();
  }, [processId]);

  return (
    <PageDefaultMarginsContainer>
      <AnimationPageContainer>
        <Stack>
          <Title order={1} mb={32}>
            Detalhes do processo {`Nº ${process?.code}`}
          </Title>
          {/*  */}
          {process && (
            <Stack gap={48}>
              <Stack>
                <Title
                  order={3}
                  onClick={() => {
                    navigate({
                      routerPath: ROUTER_PATHS.CLIENT_DETAIL,
                      params: { clientId: process.client.id },
                    });
                  }}
                >
                  <a style={{ cursor: "pointer" }}>Informações do cliente</a>
                </Title>
                <ClientInfoShow client={process.client} />
              </Stack>

              <Stack>
                <Title order={3}>Evoluções e observações</Title>
                <Group>
                  <EvolutionTimeline evolutions={process.evolutions} />
                  <ObservationTimeline observations={process.observations} />
                </Group>
              </Stack>

              <Stack>
                <Title order={3}>Honorários do processo</Title>
                <HonorariesTable honoraries={process.honoraries} />
              </Stack>
            </Stack>
          )}
        </Stack>
      </AnimationPageContainer>
    </PageDefaultMarginsContainer>
  );
};
