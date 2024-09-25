import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Main from './pages/Main'

const queryClient = new QueryClient()

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}