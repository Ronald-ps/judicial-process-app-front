import { type Honorary } from "@/services/client/types";
import { Button, Flex, Stack, Table, Text } from "@mantine/core";
import { NewHonoraryModal } from "./NewHonoraryModal";
import { useState } from "react";
import { HonorariesTable } from "@components/financial/HonorariesTable";

interface FinancialPanelProps {
  honoraries: Honorary[];
}
export const FinancialPanel = (props: FinancialPanelProps) => {
  const [newHonoraryOpen, setNewHonoraryOpen] = useState(false);
  return (
    <>
      <Stack>
        <HonorariesTable honoraries={props.honoraries} />

        <Flex>
          <Button onClick={() => setNewHonoraryOpen(true)}>
            Novo honorário
          </Button>
        </Flex>
      </Stack>
      <NewHonoraryModal
        opened={newHonoraryOpen}
        onClose={() => {
          setNewHonoraryOpen(false);
        }}
        onSubmit={() => {}}
      />
    </>
  );
};
