import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";
import { AuthContextProvider } from "./AuthProvider";

interface IProps {}

const queryClient = new QueryClient({});

export function ProviderStack(props: PropsWithChildren<IProps>) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider location={window.location}>
        <App />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
