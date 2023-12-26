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

export const ProcessDetailPage = () => {
  const [process, setProcess] = useState<null | DetailedProcess>(null);

  const processId = useParams().processId;
  if (!processId) {
    throw new Error("Nenhum id de processo passado");
  }

  const getProcess = async () => {
    const process: DetailedProcess = await getDetaildProcess(processId);
    setProcess(process);
  };

  useEffect(() => {
    getProcess();
  }, [processId]);

  return (
    <PageDefaultMarginsContainer>
      <Stack>
        <Title order={1} mb={32}>
          Detalhes do processo {`Nº ${process?.code}`}
        </Title>
        {/*  */}
        {process && (
          <Stack gap={48}>
            <Stack>
              <Text>Informações do cliente</Text>
              <ClientInfoShow client={process.client} />
            </Stack>

            <Stack>
              <Text>Evoluções e observações</Text>
              <Group>
                <EvolutionTimeline evolutions={process.evolutions} />
                <ObservationTimeline observations={process.observations} />
              </Group>
            </Stack>

            <Stack>
              <Text>Honorários do processo</Text>
              <HonorariesTable honoraries={process.honoraries} />
            </Stack>
          </Stack>
        )}
      </Stack>
    </PageDefaultMarginsContainer>
  );
};
