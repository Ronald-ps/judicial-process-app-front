import {
  Box,
  Button,
  Modal,
  NumberInput,
  Stack,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";

export const NewHonoraryModal = () => {
  // const useForm
  return (
    <Modal onClose={() => {}} opened={true}>
      <Modal.Title>Novo honorário</Modal.Title>
      <Box mt="30px"/>
      <form>
        <Stack>
          <DateInput label="Data" required />
          <NumberInput label="Valor" required />
          <NumberInput label="Valor pago" required />
          <Textarea label="Descrição" required variant="filled" size="sm" />
          <Button type="submit">Salvar</Button>
        </Stack>
      </form>
    </Modal>
  );
};
