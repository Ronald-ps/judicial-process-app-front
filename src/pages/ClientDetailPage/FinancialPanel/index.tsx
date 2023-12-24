import { formatDate } from "@/helpers/dateUtils";
import { Honorary } from "@/services/client/types";
import { Button, Flex, Stack, Table } from "@mantine/core";
import { NewHonoraryModal } from "./NewHonoraryModal";

interface FinancialPanelProps {
  honoraries: Honorary[];
}
export const FinancialPanel = (props: FinancialPanelProps) => {
  return (
    <>
      <Stack>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Data</Table.Th>
              <Table.Th>Histórico</Table.Th>
              <Table.Th>Valor da Ação</Table.Th>
              <Table.Th>Valor pago</Table.Th>
              <Table.Th>Valor restante</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {props.honoraries.map((honor) => (
              <Table.Tr key={honor.id}>
                <Table.Td>{formatDate({ date: honor.date })}</Table.Td>
                <Table.Td>{honor.description}</Table.Td>
                <Table.Td>{honor.value}</Table.Td>
                <Table.Td>{honor.paid_value}</Table.Td>
                <Table.Td>{honor.value - honor.paid_value}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Flex>
          <Button>Novo honorário</Button>
        </Flex>
      </Stack>
      <NewHonoraryModal />
    </>
  );
};
