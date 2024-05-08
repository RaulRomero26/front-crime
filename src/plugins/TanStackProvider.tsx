import { QueryClientProvider,  QueryClient, } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from "react";

const queryClient = new QueryClient()

interface TanStackProviderProps {
    children: ReactNode;
  }

export const TanStackProvider = ({children}:TanStackProviderProps) => {
  return (
    <>
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>

    
    </>
  )
}
