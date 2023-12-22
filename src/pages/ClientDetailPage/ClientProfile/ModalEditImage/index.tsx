import { Modal, Image, Stack, Group, FileInput, Button } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface ModalEditImageProps {
  opened: boolean;
  onClose: () => void;
  imageUrl?: string;
}
export const ModalEditImage = (props: ModalEditImageProps) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (!props.imageUrl) return;
    setImageSrc(props.imageUrl);
  }, [props.imageUrl]);

  return (
    <Modal opened={props.opened} onClose={props.onClose} top="20vh">
      <Stack>
        <Image radius="md" src={imageSrc} />
        <Group align="end">
          <FileInput
            rightSection={<IconPhoto />}
            label="Insira uma nova imagem para trocar"
            placeholder="Nova imagem"
            rightSectionPointerEvents="none"
            mt="md"
            accept="image/*"
            onChange={(file) => {
              if (!file) return;
              const url = URL.createObjectURL(file);
              setImageSrc(url);
            }}
          />
          <Button>Salvar</Button>
        </Group>
      </Stack>
    </Modal>
  );
};
