import { processCreate } from "@/services/client/adapters";
import {
  DetailedProcess,
  Process,
  ProcessForSave,
} from "@/services/client/types";
import { ProcessForm } from "@components/process/ProcessForm";
import { Modal, Stack, Text } from "@mantine/core";

interface NewProcessModalProps {
  onClose: () => void;
  onSave: (process: DetailedProcess) => void;
  opened: boolean;
  clientId: number;
}
export const NewProcessModal = (props: NewProcessModalProps) => {
  const handleSubmit = async (values: ProcessForSave) => {
    try {
      const process = await processCreate(values);
      await props.onSave(process);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      opened={props.opened}
      onClose={props.onClose}
      title={"Novo Processo"}
    >
      <Stack>
        <ProcessForm onSubmit={handleSubmit} />
      </Stack>
    </Modal>
  );
};
