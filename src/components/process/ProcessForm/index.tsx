import { useForm } from "@mantine/form";
import { TextInput, Button, Stack, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import type { ProcessForSave } from "@/services/client/types";
import { PROCESS_SERVICES } from "@/services/client/constants";

interface ProcessFormProps {
  onSubmit: (process: ProcessForSave) => void;
}
export const ProcessForm = (props: ProcessFormProps) => {
  const processForm = useForm({
    initialValues: {
      code: "",
      description: "",
      start_date: "",
      type: "",
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
        <TextInput
          label="Número"
          {...processForm.getInputProps("code")}
          required
        />
        <TextInput
          label="Descrição"
          {...processForm.getInputProps("description")}
          required
        />
        <DateInput
          label="Data de início"
          {...processForm.getInputProps("start_date")}
          required
        />
        <Select
          label="Serviços"
          data={Object.keys(PROCESS_SERVICES).map((key: string) => ({
            value: key,
            // @ts-expect-error typescript as vezes é burro
            label: PROCESS_SERVICES[key],
          }))}
          {...processForm.getInputProps("type")}
          required
        />
        <Button type="submit">Salvar</Button>
      </Stack>
    </form>
  );
};
