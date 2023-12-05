import { Client, clientMaritalStatus, educationLevel } from "@/services/client";
import {
  Button,
  Flex,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import classes from "./ClientForm.module.css";

interface ClientFormProps {
  title?: string;
  client: Client;
}
export const ClientForm = (props: ClientFormProps) => {
  const form = useForm({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      cpf: "",
      rg: "",
      birth_date: "",
      phone: "",
      cellphone: "",
      father_name: "",
      mother_name: "",
      childrens_quantity: 0,
      marital_status: "",
      education_level: "",
      profession: "",
      city: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      cpf: (value) => {
        // verificar se tem só numeros
        if (isNaN(Number(value))) return "CPF inválido";
        if (value.length < 11) return "CPF tem de ter 11 dígitos";
        return null;
      },
      rg: (value) => {
        if (isNaN(Number(value))) return "RG inválido";
        if (value.length < 9) return "RG tem de ter 9 dígitos";
        return null;
      },
      phone: (value) => {
        if (isNaN(Number(value))) return "Telefone inválido";
        if (value.length < 11) return "Telefone tem de ter 11 dígitos";
        return null;
      },
      cellphone: (value) => {
        if (isNaN(Number(value))) return "Celular inválido";
        if (value.length < 11) return "Celular tem de ter 11 dígitos";
        return null;
      },
      childrens_quantity: (value) => {
        if (isNaN(Number(value))) return "Quantidade de filhos inválida";
        if (value < 0) return "Quantidade de filhos tem de ser maior que 0";
        return null;
      },
      marital_status: (value) => {
        if (value === "") return "Estado civil inválido";
        if (!["solteiro", "casado", "divorciado", "viuvo"].includes(value))
          return "Estado civil inválido";
        return null;
      },
      education_level: (value) => {
        if (value === "") return "Escolaridade inválida";
        if (!["fundamental", "medio", "superior"].includes(value))
          return "Escolaridade inválida";
        return null;
      },
    },
  });

  if (props.client) {
    form.setValues(props.client);
  }

  return (
    <Stack>
      <Text size="xl" fw={600}>
        {props.title || "Formulário do Cliente"}
      </Text>

      <form>
        <Stack>
          <Group w="100%" grow>
            <TextInput
              label="Nome"
              required
              withAsterisk
              {...form.getInputProps("first_name")}
            />
            <TextInput
              label="Sobrenome"
              required
              withAsterisk
              {...form.getInputProps("last_name")}
            />
          </Group>

          <Group grow w="100%">
            <TextInput
              label="Endereço"
              required
              withAsterisk
              {...form.getInputProps("address")}
            />
            <TextInput
              label="Cidade"
              required
              withAsterisk
              {...form.getInputProps("city")}
            />
          </Group>

          <Group grow w="100%">
            <TextInput
              label="CPF"
              required
              withAsterisk
              {...form.getInputProps("cpf")}
            />
            <TextInput
              label="RG"
              required
              withAsterisk
              {...form.getInputProps("rg")}
            />
          </Group>

          <Group grow w="100%">
            <DateInput
              label="Data de Nascimento"
              required
              withAsterisk
              defaultLevel="decade"
              locale="pt-BR"
              {...form.getInputProps("birth_date")}
              maxDate={new Date()}
            />
            <TextInput
              label="Email"
              type="email"
              required
              withAsterisk
              {...form.getInputProps("email")}
            />
          </Group>

          <Group grow>
            <TextInput
              label="Telefone"
              required
              withAsterisk
              {...form.getInputProps("phone")}
            />
            <TextInput
              label="Celular"
              required
              withAsterisk
              {...form.getInputProps("cellphone")}
            />
          </Group>

          <Group grow>
            <TextInput
              label="Nome do Pai"
              {...form.getInputProps("father_name")}
            />
            <TextInput
              label="Nome da Mãe"
              required
              withAsterisk
              {...form.getInputProps("mother_name")}
            />
          </Group>

          <Group grow>
            <Select
              label="Escolaridade"
              required
              withAsterisk
              {...form.getInputProps("education_level")}
              data={Object.values(educationLevel)}
            />
            <TextInput
              label="Profissão"
              required
              withAsterisk
              {...form.getInputProps("profession")}
            />
          </Group>

          <Group grow>
            <Select
              label="Estado Civil"
              placeholder="Selecione uma opção"
              data={Object.values(clientMaritalStatus)}
              required
              withAsterisk
              {...form.getInputProps("marital_status")}
            />
            <NumberInput
              label="Quantidade de filhos"
              required
              withAsterisk
              {...form.getInputProps("childrens_quantity")}
            />
          </Group>
          <Button
            w="25%"
            type="submit"
            color="#1c16428c"
            className={classes.clientFormSubmitButton}
          >
            Salvar
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
