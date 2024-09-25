import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query"; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getSession } from '../services/api'
import Auth from './Auth'
import Blogs from './Blogs'

const queryClient = new QueryClient()

export default () => {
  const [ isLogin, setIsLogin ] = useState(false)

  const { data: sessiondata, isLoading }= useQuery({
    queryFn: () => getSession(),
    queryKey: ['websession'],
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      { sessiondata?.session ? <Blogs /> : <Auth />}
    </QueryClientProvider>
  );
}