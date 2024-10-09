'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Currencies from "@/app/currencies/Currencies";

const queryClient = new QueryClient();

const CurrenciesProvider = () => {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider>
                    <div className='bg-[#1E1E1E]'>
                            <Currencies />
                    </div>
                </ChakraProvider>
            </QueryClientProvider>
        </>

    );
};

export default CurrenciesProvider;
