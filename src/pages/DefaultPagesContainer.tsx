import { useDisclosure } from "@mantine/hooks";
import {
  AppShell,
  Box,
  Burger,
  Group,
  NavLink,
  Text,
} from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "./routers";

export const DefaultPagesContainer = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Box>
            <Text fw={600}>Brag App</Text>
          </Box>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink label="Página inicial" onClick={() => navigate(ROUTER_PATHS.HOME)} active={location.pathname === ROUTER_PATHS.HOME}/>
        <NavLink label="Minhas contribuições" onClick={() => navigate(ROUTER_PATHS.CONTRIBUTIONS)} active={location.pathname === ROUTER_PATHS.CONTRIBUTIONS}/>
        <NavLink label="Documentos" onClick={() => navigate("/")} active={location.pathname ===  "/docs"}/>
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
