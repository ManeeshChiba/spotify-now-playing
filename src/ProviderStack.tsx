import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "./App";

interface IProps {}

const queryClient = new QueryClient({});

export function ProviderStack(props: PropsWithChildren<IProps>) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthContextProvider location={window.location}> */}
      <App />
      {/* </AuthContextProvider> */}
    </QueryClientProvider>
  );
}
