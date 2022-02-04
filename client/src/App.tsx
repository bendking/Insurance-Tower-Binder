import * as React from "react"
import { ChakraProvider, theme, Center } from "@chakra-ui/react"

import { ColorModeSwitcher } from "./template_files/ColorModeSwitcher"
import Tower from "./components/Tower"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Center>
      <Tower />
    </Center>
    {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
  </ChakraProvider>
)
