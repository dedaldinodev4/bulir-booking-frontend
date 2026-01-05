"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "./react-query";
import { ReduxProvider } from '@/redux/provider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
