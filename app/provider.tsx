// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'

const theme = {
    // ... your system-ui theme
    config: {
      useSystemColorMode: false, // or true
      initialColorMode: "light", // or "dark"
      cssVarPrefix: "chakra", // any string
    }
  }

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}