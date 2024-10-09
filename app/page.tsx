'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
const queryClient = new QueryClient();

export default function Home() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <div className='bg-[#1E1E1E]'>

                </div>
            </ChakraProvider>
        </QueryClientProvider>
    );
}
