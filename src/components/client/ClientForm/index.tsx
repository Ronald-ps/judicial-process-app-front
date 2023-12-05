import { clientMaritalStatus, educationLevel } from "@/services/client";
import {
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

interface ClientFormProps {
  title?: string;
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
  return (
    <Stack>
      <Text size="xl" fw={600}>
        {props.title || "Formulário do Cliente"}
      </Text>

      <form>
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
            withAsterisk
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
      </form>
    </Stack>
  );
};

/* /* Nome completo:__________________________________________________________________________________
Endereço:Endereço: ______________________________________________________________________________________
CPF:CPF: _________________________ RG:RG: __________________________ SSPSSP:___________________/_______
Data de Nacimento: ____/____/_____Data de Nacimento: ____/____/_____ Telefone:Telefone: ( )________-___________ Celular:Celular: ( ) _________ - _________
E-mail:E-mail: ________________________________________________________________________________________
Pai:Pai: __________________________________________________________________________________________
Mâe:Mâe: _________________________________________________________________________________________
Filhos:Filhos: ( ) Sim ( ) Não Quantos:Quantos: _________________________________
Escolaridade:Escolaridade: ____________________________________ Profissão:Profissão: ____________________________________
Estado Cívil:Estado Cívil: ____________________________ Cidade:Cidade: ______________________________________________ */

/*   id: number;
  first_name: string;
  last_name: string;
  cpf: string;
  rg: string;
  birth_date: string;
  phone: string;
  cellphone: string;
  email: string;
  father_name: string;
  mother_name: string;
  childrens_quantity: number;
  education_level: string;
  profession: string;
  marital_status: string;
  city: string; */
