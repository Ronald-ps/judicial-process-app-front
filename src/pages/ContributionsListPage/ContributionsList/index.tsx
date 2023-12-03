import { type Contribution } from "@services/contribution";
import { ContributionItem } from "../ContributionItem";
import { Stack } from "@mantine/core";
import { ScrollArea } from "@mantine/core";

interface ContributionsListProps {
  contributions: Contribution[];
}
export const ContributionsList = (props: ContributionsListProps) => {
  return (
    <ScrollArea.Autosize mah="100%">
      <Stack gap="8px">
        {props.contributions.map((contribution) => (
          <ContributionItem contribution={contribution} />
        ))}
      </Stack>
    </ScrollArea.Autosize>
  );
};
