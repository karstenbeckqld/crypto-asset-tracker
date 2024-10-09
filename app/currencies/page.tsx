'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Currencies from "@/app/currencies/Currencies";
import { Spinner } from "@chakra-ui/icons";
import { Suspense } from "react";

const queryClient = new QueryClient();

const CurrenciesProvider = () => {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ChakraProvider>
                    <div className='bg-[#1E1E1E]'>
                        <Suspense fallback={<Spinner />}>
                            <Currencies />
                        </Suspense>
                    </div>
                </ChakraProvider>
            </QueryClientProvider>
        </>

    );
};

export default CurrenciesProvider;
