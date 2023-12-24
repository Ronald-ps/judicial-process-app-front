import { useParams } from "react-router-dom";
import { DetailedProcess } from "@services/process/types";
import { useEffect, useState } from "react";
import { getDetaildProcess } from "@services/process/adapters";
import { Stack, Text } from "@mantine/core"

export const ProcessDetailPage = () => {
  const [processDetail, setProcessDetail] = useState<null | DetailedProcess>(
    null
  );

  const processId = useParams().processId;
  if (!processId) {
    throw new Error("Nenhum id de processo passado");
  }

  const getProcess = async () => {
    const process = await getDetaildProcess(processId);
    setProcessDetail(process);
  };

  useEffect(() => {
    getProcess();
  }, [processId]);

  return <Stack>
    <Stack>
      <Text>Nome: {}</Text>
    </Stack>
  </Stack>;
};
