import * as React from "react"
import { ChakraProvider, theme, Center, Heading, VStack, Box, Grid } from "@chakra-ui/react"

import { ColorModeSwitcher } from "./template_files/ColorModeSwitcher"
import Tower from "./components/Tower"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize="xl">
      <Grid p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Tower />
      </Grid>
    </Box>
  </ChakraProvider>
)
