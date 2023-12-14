import { Modal, Stack, Select, Textarea, Button } from "@mantine/core";

interface NewEvolutionModalProps {
  opened: boolean;
  onClose: () => void;
  onSave: () => void;
  title?: string;
  clientId: string;
}

export const NewEvolutionModal = (props: NewEvolutionModalProps) => {
  const getAvailableProcesses = async () => {
    const response = await fetch(`http://localhost:8080/processes?clientId=${props.clientId}`);
    const data = await response.json();
    return data;
  }

  return (
    <>
      <Modal opened={props.opened} onClose={props.onClose} title={props.title}>
        <form onSubmit={props.onSave}>
          <Stack>
            <Select data={props.availableProcesses} label="Processo" required />
            <Textarea label="Evolução" required variant="filled" size="lg" />
            <Button type="submit">Salvar</Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};
