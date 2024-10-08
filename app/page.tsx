'use client'

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import useTokens from "@/app/react-query/hooks/useTokens";
import CoinToken from "@/app/components/token";
import Token from "@/app/components/token";

const queryClient = new QueryClient();

export default function Home() {

    // Get the asset data from the backend API.
    const {data, error} = useTokens();

    console.log(data);

    // If an error occurs, display the error message.
     if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
            <div className='bg-neutral-800'>
                <div className='flex p-5 bg-neutral-900 mb-5 text-slate-50'>
                    <div className='w-1/4'>Rank</div>
                    <div className='w-1/4'>Name</div>
                    <div className='w-1/4'>Price</div>
                    <div className='w-1/4'>24h Change</div>
                </div>

                {/*Display each asset (token) using the CoinToken component.*/}
                {Array.isArray(data) ? (
                    data.map((token) => (
                        <CoinToken key={token.cmc_rank}
                        cmc_rank={token.cmc_rank}
                        name={token.name}
                        price={token.quote.USD.price}
                        percent_change_24h={token.quote.USD.percent_change_24h}/>
                    ))
                ) : (
                    <p>No data available</p>
                )}

            </div>
        </ChakraProvider>
        </QueryClientProvider>
    );
}
