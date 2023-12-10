import type { DetailedProcess, Evolution } from "@services/client/types";
import { EvolutionTimeline } from "./EvolutionTimeline";
import { useEffect, useState } from "react";
import { Box, Button, Stack, Text } from "@mantine/core";
import classes from "./InformationAndObservationPanel.module.css";

interface InformationAndObservationPanelProps {
  processes: DetailedProcess[];
}
export const InformationAndObservationPanel = (
  props: InformationAndObservationPanelProps
) => {
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);

  useEffect(() => {
    const evolutions = props.processes
      .map((process) => process.evolutions)
      .flat();
    setEvolutions(evolutions);
  }, [props.processes]);
  return (
    <Stack>
      <Text fw={400}>Evoluções</Text>
      <Box className={classes.timelineContainer}>
        <EvolutionTimeline evolutions={evolutions} />
        <Button mt={20}> Nova evolução</Button>
      </Box>
    </Stack>
  );
};
