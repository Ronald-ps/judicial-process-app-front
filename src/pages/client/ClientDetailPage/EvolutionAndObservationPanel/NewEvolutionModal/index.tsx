import {
  evolutionCreate,
  getSimpleProcesses,
} from "@/services/client/adapters";
import { Evolution, SimpleProcess } from "@/services/client/types";
import { Modal, Stack, Select, Textarea, Button } from "@mantine/core";
import { useEffect, useState } from "react";

interface NewEvolutionModalProps {
  opened: boolean;
  onClose: () => void;
  onSave: ({ evolution }: { evolution: Evolution }) => void;
  title?: string;
  clientId: string;
}

export const NewEvolutionModal = (props: NewEvolutionModalProps) => {
  const [availableProcesses, setAvailableProcesses] = useState(
    [] as SimpleProcess[]
  );
  const [selectedProcess, setSelectedProcess] = useState("" as string | null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const getAvailableProcesses = async () => {
    const simpleProcessList = await getSimpleProcesses(props.clientId);
    setAvailableProcesses(simpleProcessList);
  };

  const handleSubmit = async () => {
    if (!selectedProcess) {
      throw new Error("selectedProcess is required");
    }
    setLoading(true);
    try {
      const evolution = await evolutionCreate(selectedProcess, description);
      await props.onSave({ evolution });
      setSelectedProcess(null);
      setDescription("");
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAvailableProcesses();
  }, []);

  return (
    <>
      <Modal
        opened={props.opened}
        onClose={props.onClose}
        title={props.title}
        centered
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}
        >
          <Stack>
            <Select
              data={availableProcesses.map(
                (process): { label: string; value: string } => ({
                  label: process.code,
                  value: process.id.toString(),
                })
              )}
              label="Processo"
              required
              value={selectedProcess}
              onChange={(value) => setSelectedProcess(value)}
            />
            <Textarea
              label="Evolução"
              required
              variant="filled"
              size="sm"
              autosize
              data-autofocus
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
            />
            <Button type="submit" loading={loading}>
              Salvar
            </Button>
          </Stack>
        </form>
      </Modal>
    </>
  );
};
