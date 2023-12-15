import { useForm } from "@mantine/form";
import { TextInput, Button, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import type { ProcessForSave } from "@services/clients/types";

interface ProcessFormProps {
  onSubmit: (process: ProcessForSave) => void;
}
export const ProcessForm = (props: ProcessFormProps) => {
  const processForm = useForm({
    initialValues: {
      code: "",
      description: "",
      startDate: "",
    },
  });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await props.onSubmit(processForm.values);
      }}
    >
      <Stack>
        <TextInput label="Número" {...processForm.getInputProps("code")} />
        <TextInput
          label="Descrição"
          {...processForm.getInputProps("description")}
        />
        <DateInput
          label="Data de início"
          {...processForm.getInputProps("startDate")}
        />
        <Button type="submit">Salvar</Button>
      </Stack>
    </form>
  );
};
