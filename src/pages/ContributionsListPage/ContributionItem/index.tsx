import { Contribution } from "@/services/contribution";
import { Box, Paper, Text } from "@mantine/core";

interface ContributionItemProps {
  contribution: Contribution;
}
export const ContributionItem = (props: ContributionItemProps) => {
  return (
    <Paper withBorder p="20px" shadow="xs">
      <Box>
        <Text c="dimmed" mb="8px">
          {props.contribution.title}
        </Text>
        <Text c="dimmed" mb="16px">
          {new Date(props.contribution.date).toLocaleString("pt-BR")}
        </Text>
      </Box>
      <Box>
        <Text lineClamp={3} c="dimmed">
          {props.contribution.description}
        </Text>
      </Box>
    </Paper>
  );
};
