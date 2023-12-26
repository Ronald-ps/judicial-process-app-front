import type { DetailedProcess } from "@services/client/types";
import { Table } from "@mantine/core";
import { formatDate } from "@/helpers/dateUtils";
import { useNavigateWithConstructRoute } from "@/pages/hooks";
import { ROUTER_PATHS } from "@/pages/routers";

interface ProcessesTableProps {
  processes: DetailedProcess[];
}
export const ProcessesTable = (props: ProcessesTableProps) => {
  const navigate = useNavigateWithConstructRoute();

  return (
    <Table striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nº</Table.Th>
          <Table.Th>Data de início</Table.Th>
          <Table.Th>Serviço</Table.Th>
          {/* <Table.Th>Última observação</Table.Th> */}
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {props.processes.map((process, i) => (
          <Table.Tr
            key={i}
            onClick={() => {
              navigate({
                routerPath: ROUTER_PATHS.PROCESS_DETAIL,
                params: { processId: process.id },
              });
            }}
            style={{ cursor: "pointer" }}
          >
            <Table.Td>{process.code}</Table.Td>
            <Table.Td>{formatDate({ date: process.start_date })}</Table.Td>
            <Table.Td>{process.type}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
