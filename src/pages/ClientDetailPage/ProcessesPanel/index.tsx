import type { DetailedProcess, Process } from "@services/client/types";
import { Button, Flex, Stack, Table } from "@mantine/core";
import { formatDate } from "@/helpers/dateUtils";
import { NewProcessModal } from "./NewProcessModal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ProcessesPanelProps {
  processes: DetailedProcess[];
}
export const ProcessesPanel = (props: ProcessesPanelProps) => {
  const [newProcessModalOpened, setNewProcessModalOpened] = useState(false);
  const [processesCopy, setProcessesCopy] = useState(props.processes);

  const clientId = useParams().clientId;
  if (!clientId) {
    throw new Error("clientId is required");
  }

  const handleSaveProcess = async (process: DetailedProcess) => {
    console.log("process", process);
    const newProcesses = [process, ...processesCopy];
    setProcessesCopy(newProcesses);
    setNewProcessModalOpened(false);
  };

  useEffect(() => {
    setProcessesCopy(props.processes);
  }, [props.processes]);

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
            {processesCopy.map((process) => (
              <Table.Tr key={process.id}>
                <Table.Td>{process.code}</Table.Td>
                <Table.Td>
                  {formatDate({ dateString: process.start_date })}
                </Table.Td>
                <Table.Td>
                  {process.evolutions.length
                    ? formatDate({
                        dateString:
                          process.evolutions[process.evolutions.length - 1]
                            .created_at,
                      })
                    : "Nenhuma evolução registrada"}
                </Table.Td>
                <Table.Td>
                  {process.observations.length
                    ? formatDate({
                        dateString:
                          process.evolutions[process.evolutions.length - 1]
                            .created_at,
                      })
                    : "Nenhuma observação registrada"}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Flex mt={16}>
          <Button px="34px" onClick={() => setNewProcessModalOpened(true)}>
            Novo processo
          </Button>
        </Flex>

        <NewProcessModal
          clientId={clientId}
          onClose={() => {
            setNewProcessModalOpened(false);
          }}
          opened={newProcessModalOpened}
          onSave={handleSaveProcess}
        />
      </Stack>
    </>
  );
};
