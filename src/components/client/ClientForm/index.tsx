import { TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

export const ClientForm = () => {
  const form = useForm({
    initialValues: {
      email: "",
      address: "",
      cpf: "",
      rg: "",
      birth_date: "",
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
    },
  });
  return (
    <form>
      <TextInput
        label="Email"
        required
        withAsterisk
        {...form.getInputProps("email")}
      />
      <TextInput
        label="Endereço"
        required
        withAsterisk
        {...form.getInputProps("address")}
      />
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
      <DateInput
        label="Data de Nascimento"
        required
        withAsterisk
        defaultLevel="decade"
        locale="pt-BR"
        {...(form.getInputProps("birth_date"))}
      />
    </form>
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
