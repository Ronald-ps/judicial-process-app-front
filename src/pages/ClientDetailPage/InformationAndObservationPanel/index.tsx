import type { DetailedProcess, Evolution } from "@services/client/types";
import { EvolutionTimeline } from "./EvolutionTimeline";
import { ObservationTimeline } from "./ObservationTimeline";
import { useEffect, useState } from "react";
import { Box, Button, Group, Stack, Text } from "@mantine/core";
import classes from "./InformationAndObservationPanel.module.css";

interface InformationAndObservationPanelProps {
  processes: DetailedProcess[];
}
export const InformationAndObservationPanel = (
  props: InformationAndObservationPanelProps
) => {
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);
  const [observations, setObservations] = useState<bservations[]>([]);

  useEffect(() => {
    const evolutions = props.processes
      .map((process) => process.evolutions)
      .flat();
    setEvolutions(evolutions);
  }, [props.processes]);

  useEffect(() => {
    const observations = props.processes
      .map((process) => process.observations)
      .flat();
    setObservations(observations);
  }, [props.processes]);

  return (
    <Stack>
      <Group className={classes.timelineContainer} gap={48}>
        <Box w="500px">
          <Text fw={400} mb="24px">
            Evoluções
          </Text>
          <EvolutionTimeline evolutions={evolutions} />
          <Button mt={20}> Nova evolução</Button>
        </Box>
        <Box w="500px">
          <Text fw={400} mb="24px">
            Observações
          </Text>
          <ObservationTimeline observations={observations} />
          <Button mt={20}> Nova observação</Button>
        </Box>
      </Group>
    </Stack>
  );
};
