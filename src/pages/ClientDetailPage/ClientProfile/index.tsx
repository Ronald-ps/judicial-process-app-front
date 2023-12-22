import type { Client } from "@services/client/types";
import { getProfileImage } from "@services/client/adapters";
import { useEffect, useState } from "react";
import { Avatar, Box, Group, Stack, Text } from "@mantine/core";

interface ClientProfileProps {
  client: Client;
  onEdit?: (client: Client) => void;
  onDelete?: (client: Client) => void;
}
export const ClientProfile = (props: ClientProfileProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  useEffect(() => {
    const getImage = async () => {
      const imageBlob = await getProfileImage(props.client.id);
      if (imageBlob.type === "application/json") {
        return
      }
      const imageUrl = window.URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
    };
    if (props.client) {
      getImage();
    }
  }, [props.client]);

  return (
    <Box h="100px">
      {props.client && (
        <Group>
          {imageUrl ? (
            <Avatar src={imageUrl} size="xl" />
          ) : (
            <Avatar color="cyan" size="xl">
              {props.client.first_name.substring(0, 2)}
            </Avatar>
          )}
          <Stack>
            <Text fw={500} fz={20}>
              {props.client.first_name} {props.client.last_name}
            </Text>
            <Text c="dimmed">
              Pasta {props.client.id.toString().padStart(4, "0")}
            </Text>
          </Stack>
        </Group>
      )}
    </Box>
  );
};
