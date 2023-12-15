import type { DetailedProcess, Evolution } from "@services/client/types";
import { Box, Stack } from "@mantine/core";
import { ScrollAreaAutosize, Timeline, Text } from "@mantine/core";
import {
  IconGitBranch,
  IconGitCommit,
  IconGitPullRequest,
  IconMessageDots,
} from "@tabler/icons-react";
import classes from "./EvolutionItem.module.css";
import { formatDate } from "@/helpers/dateUtils";

interface ProcessItemProps {
  evolution: Evolution;
}
export const EvolutionItem = (props: ProcessItemProps) => {
  return (
    <>
      <Text fw={100} mb="2">
        Nº {props.evolution.process_code}
      </Text>
      <Box className={classes.evolutionItemBoxContainer} maw="80%">
        <Text c="dimmed" size="sm">
          {props.evolution.description}
        </Text>
      </Box>
      <Text size="xs" mt={4} fw={300} c="#595959">
        {formatDate({ dateString: props.evolution.created_at })}
      </Text>
    </>
  );
};

interface EvolutionTimelineProps {
  evolutions: Evolution[];
  maxHeight?: string;
}
export const EvolutionTimeline = (props: EvolutionTimelineProps) => {
  return (
    <Stack>
      <ScrollAreaAutosize mah={props.maxHeight || "500px"}>
        <Timeline active={-1} bulletSize={24} lineWidth={2}>
          {props.evolutions.map((evolution) => (
            <Timeline.Item
              bullet={<IconMessageDots size={12} />}
              key={evolution.id}
            >
              <EvolutionItem evolution={evolution} />
            </Timeline.Item>
          ))}
        </Timeline>
      </ScrollAreaAutosize>
    </Stack>
  );
};
