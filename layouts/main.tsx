import { LayoutProps } from "@/types";
import { Box, Container } from "@mui/material";

export function MainLayout({ children }: LayoutProps) {
  return (
    <Box overflow={"hidden"}>
      <Container maxWidth="md">
        <Box>{children}</Box>
      </Container>
    </Box>
  );
}
