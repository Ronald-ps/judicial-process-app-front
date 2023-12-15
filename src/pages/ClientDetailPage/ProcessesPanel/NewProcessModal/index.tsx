import { ProcessForm } from "@components/process/ProcessForm";
import { Modal } from "@mantine/core";

interface NewProcessModalProps {
  onClose: () => void;
  onSave: () => void;
  opened: boolean;
}
export const NewProcessModal = (props: NewProcessModalProps) => {
  return (
    <Modal opened={props.opened} onClose={props.onClose}>
      <ProcessForm onSubmit={() => {}} />
    </Modal>
  );
};
