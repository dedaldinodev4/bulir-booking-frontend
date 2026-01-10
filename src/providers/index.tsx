"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "./react-query";
import { ReduxProvider } from '@/redux/provider';
import { ToastifyProvider } from "./react-toastify";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <ReduxProvider>
          <ToastifyProvider>
            {children}
          </ToastifyProvider>
        </ReduxProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
