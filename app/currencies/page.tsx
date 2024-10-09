'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CurrenciesTable from "@/app/currencies/CurrenciesTable";

const queryClient = new QueryClient();

const Currencies = () => {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider>
                    <div className='bg-[#1E1E1E]'>
                            <CurrenciesTable />
                    </div>
                </ChakraProvider>
            </QueryClientProvider>
        </>

    );
};

export default Currencies;
