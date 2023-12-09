import type { DetailedProcess } from "@services/client/types";
import { Stack, Box } from "@mantine/core";

interface ProcessesPanelProps {
  processes: DetailedProcess[];
}
export const ProcessesPanel = (props: ProcessesPanelProps) => {
  return (
    <>
      <Stack>
        {props.processes.map((process) => (
          <ProcessItem process={process} key={process.id}/>
        ))}
      </Stack>
    </>
  );
};

interface ProcessItemProps {
  process: DetailedProcess;
}
export const ProcessItem = (props: ProcessItemProps) => {
  return (
    <>
      <Stack>
        <Box>
          <p>Número: {props.process.code}</p>
        </Box>
      </Stack>
    </>
  );
};
