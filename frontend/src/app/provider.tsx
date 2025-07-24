import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { GFProvider } from "@/context/AuthContext";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <div>
      <GFProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </GFProvider>
    </div>
  );
};

export default Provider;
