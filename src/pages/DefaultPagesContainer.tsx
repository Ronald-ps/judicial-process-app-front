import { useDisclosure, useElementSize } from "@mantine/hooks";
import { AppShell, Box, Burger, Group, NavLink, Text } from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "./routers";

export const DefaultPagesContainer = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();
  const { ref: mainRef, height: mainHeight } = useElementSize();

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
            <Text fw={700} c="#1c1642" fz={"1.6rem"}>
              Plural Patentes
            </Text>
          </Box>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <NavLink
          label="Clientes"
          onClick={() => navigate(ROUTER_PATHS.CLIENTS)}
          active={location.pathname === ROUTER_PATHS.CLIENTS}
        />
        <NavLink
          label="Minhas contribuições"
          onClick={() => navigate(ROUTER_PATHS.CONTRIBUTIONS)}
          active={location.pathname === ROUTER_PATHS.CONTRIBUTIONS}
        />
        <NavLink
          label="Documentos"
          onClick={() => navigate("/")}
          active={location.pathname === "/docs"}
        />
      </AppShell.Navbar>
      <AppShell.Main ref={mainRef}>
        {/* mainheight será um valor float, o que garante que alturas relativas vinda
        dos elementos filhos (Outlet) funcionarão corretamente */}
        <Box h={`${mainHeight}px`}>
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};
