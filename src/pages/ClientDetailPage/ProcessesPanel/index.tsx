import type { DetailedProcess } from "@services/client/types";
import { Button, Flex, Stack, Table } from "@mantine/core";
import { formatDate } from "@/helpers/dateUtils";

interface ProcessesPanelProps {
  processes: DetailedProcess[];
}
export const ProcessesPanel = (props: ProcessesPanelProps) => {
  return (
    <>
      <Stack>
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Nº</Table.Th>
              <Table.Th>Data de início</Table.Th>
              <Table.Th>Última evolução</Table.Th>
              <Table.Th>Última observação</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {props.processes.map((process) => (
              <Table.Tr>
                <Table.Td>{process.code}</Table.Td>
                <Table.Td>{formatDate(process.start_date)}</Table.Td>
                <Table.Td>
                  {process.evolutions.length
                    ? formatDate(
                        process.evolutions[process.evolutions.length - 1]
                          .created_at
                      )
                    : "Nenhuma evolução registrada"}
                </Table.Td>
                <Table.Td>
                  {process.observations.length
                    ? formatDate(
                        process.evolutions[process.evolutions.length - 1]
                          .created_at
                      )
                    : "Nenhuma observação registrada"}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Flex mt={16}>
          <Button px="34px">Novo processo</Button>
        </Flex>
      </Stack>
    </>
  );
};
