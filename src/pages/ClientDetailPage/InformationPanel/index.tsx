import { formatDate } from "@/helpers/dateUtils";
import { useNavigateWithConstructRoute } from "@/pages/hooks";
import { ROUTER_PATHS } from "@/pages/routers";
import { Box, Button, Flex, Grid, Stack, Text } from "@mantine/core";
import type { Client } from "@services/client/types";

export const InformationItem = (props: { label: string; value: string }) => {
  const { label, value } = props;
  return (
    <Box>
      <Text component="span" fw={500}>
        {label}:
      </Text>
      <Text component="span" ml={12}>
        {value}
      </Text>
    </Box>
  );
};

interface InformationPanelProps {
  client: Client;
}
/**
 * @description painel de informações pessoais do cliente
 * @param {Client} cliente - cliente a ser exibido
 */
export const InformationPanel = (props: InformationPanelProps) => {
  const { client } = props;
  const navigate = useNavigateWithConstructRoute();
  return (
    <div>
      <Stack w={600}>
        <Text fz="1.5em" fw={500}>
          Informações pessoais
        </Text>
        <Grid>
          <Grid.Col span={6}>
            <Stack>
              <InformationItem label="Nome" value={client.first_name} />
              <InformationItem label="Sobrenome" value={client.last_name} />
              <InformationItem label="CPF" value={client.cpf} />
              <InformationItem label="RG" value={client.rg} />
              <InformationItem
                label="Data de nascimento"
                value={formatDate({
                  dateString: client.birth_date,
                  withTime: false,
                })}
              />
              <InformationItem label="Telefone" value={client.phone} />
              <InformationItem label="Celular" value={client.cellphone} />
              <InformationItem label="Email" value={client.email} />
            </Stack>
          </Grid.Col>

          <Grid.Col span={6}>
            <Stack>
              <InformationItem label="Nome do pai" value={client.father_name} />
              <InformationItem label="Nome da mãe" value={client.mother_name} />
              <InformationItem
                label="Quantidade de filhos"
                value={client.childrens_quantity.toString()}
              />
              <InformationItem
                label="Nível de escolaridade"
                value={client.education_level}
              />
              <InformationItem label="Profissão" value={client.profession} />
              <InformationItem
                label="Estado civil"
                value={client.marital_status}
              />
              <InformationItem label="Endereço" value={client.address} />
              <InformationItem label="Cidade" value={client.city} />
            </Stack>
          </Grid.Col>
        </Grid>

        <Flex justify={"end"} pr={40} pt={30}>
          <Button
            onClick={() => {
              navigate({
                routerPath: ROUTER_PATHS.EDIT_CLIENT,
                params: { clientId: client.id },
              });
            }}
          >
            Editar informações
          </Button>
        </Flex>
      </Stack>
    </div>
  );
};
