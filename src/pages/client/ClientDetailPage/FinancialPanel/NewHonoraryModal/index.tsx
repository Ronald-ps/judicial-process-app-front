import {
  Box,
  Button,
  Modal,
  NumberInput,
  Stack,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";


interface NewHonoraryModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
export const NewHonoraryModal = (props: NewHonoraryModalProps) => {
  // const useForm
  return (
    <Modal onClose={props.onClose} opened={props.opened}>
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
