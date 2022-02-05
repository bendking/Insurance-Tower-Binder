import { ChakraProvider, theme, Center, Grid } from "@chakra-ui/react";

import { ColorModeSwitcher } from "./template_files/ColorModeSwitcher";
import Tower from "./components/Tower";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Grid p={3}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Center height="xl">
        <Tower />
      </Center>
    </Grid>
  </ChakraProvider>
);
