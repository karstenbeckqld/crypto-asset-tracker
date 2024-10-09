'use client'; // Ensuring client-side rendering

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input, Search2Icon, Spinner, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import CoinToken from '@/app/components/token';
import useTokens from '@/app/react-query/hooks/useTokens';
import { TokenType } from "@/app/types/CryptoTypes";

// Function to display sorting arrow
function displayArrow(sortKey: string, activeSort: string, order: string) {
    if (sortKey !== activeSort) {
        return <TriangleUpIcon />;
    }
    return order === 'asc' ? <TriangleUpIcon color='purple.500' /> : <TriangleDownIcon color='purple.500' />;
}

// Header display function
function displayHeader() {
    return (
        <div id='text' className='flex flex-row items-center w-full p-2.5'>
            <div className='flex flex-col w-full items-stretch justify-between text-[#ffffff] p-2.5'>
                <h1 className='text-2xl font-bold'>AssetTracker</h1>
                <p className='text-[#707070]'>Track your favourite crypto assets</p>
            </div>
        </div>
    );
}

// Search field display function
function displaySearchField(searchQuery: string, setSearchQuery: (value: string) => void) {
    return (
        <div id='search' className='flex flex-row items-center w-full p-2.5 mt-2.5'>
            <Input
                type='text'
                color='white'
                placeholder='Search by name or symbol...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
}

const Currencies = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isClient, setIsClient] = useState(false); // Track if we're on the client side
    const {data, error} = useTokens(); // Fetch tokens using a custom hook
    const router = useRouter();

    const searchParams = useSearchParams(); // Search params hook

    // Toggle search display
    const toggleDisplay = () => {
        setShowSearch(!showSearch);
        setSearchQuery("");
    };

    // Ensure this hook runs only on the client side
    useEffect(() => {
        setIsClient(true);
    }, []);

    // If we're not on the client, render a spinner
    if (!isClient) {
        return <Spinner />;
    }

    // Get the sorting key and order from the URL search params
    const sort = searchParams.get('sort') || 'cmc_rank';
    const order = searchParams.get('order') || 'asc';

    // Handle sorting logic
    const handleSort = (key: string) => {
        const newOrder = order === 'asc' ? 'desc' : 'asc';
        const params = new URLSearchParams(searchParams);
        params.set('sort', key);
        params.set('order', newOrder);
        router.push(`?${params.toString()}`);
    };

    // Sorting function for tokens
    const sortData = (tokens: TokenType[], key: string, order: 'asc' | 'desc') => {
        return [...tokens].sort((a, b) => {
            let aValue, bValue;

            if (key === 'price') {
                aValue = a.quote.USD.price;
                bValue = b.quote.USD.price;
            } else if (key === 'percent_change_24h') {
                aValue = a.quote.USD.percent_change_24h;
                bValue = b.quote.USD.percent_change_24h;
            } else if (key === 'name') {
                aValue = a.name.toLowerCase();
                bValue = b.name.toLowerCase();
            } else {
                aValue = a.cmc_rank;
                bValue = b.cmc_rank;
            }

            if (aValue < bValue) return order === 'asc' ? -1 : 1;
            if (aValue > bValue) return order === 'asc' ? 1 : -1;
            return 0;
        });
    };

    // Filter and sort tokens based on search query and sorting params
    const filteredTokens = data ? data.filter((token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    const sortedTokens = sortData(filteredTokens, sort as string, order as 'asc' | 'desc');

    return (
        <div>
            {error && <div>Error: {error.message}</div>}

            {/* Header and search toggle */}
            <div className='flex flex-row items-center w-full pl-6 h-10 pt-4 mb-3'>
                {showSearch ? displaySearchField(searchQuery, setSearchQuery) : displayHeader()}
                <button
                    onClick={toggleDisplay}
                    className={showSearch
                        ? `order-first bg-[#1E1E1E] p-2.5 text-[#ffffff] mt-4`
                        : `order-last bg-[#1E1E1E] p-2.5 text-[#ffffff] mt-4`}
                >
                    <Search2Icon />
                </button>
            </div>

            {/* Sorting buttons */}
            <div className='flex px-8 py-1 bg-[#1E1E1E] mb-2.5 text-[#ffffff]'>

                <button className='flex-none w-1/5 ml-0' onClick={() => handleSort('cmc_rank')}>
                    # {displayArrow('cmc_rank', sort, order)}
                </button>
                <button className='w-1/4' onClick={() => handleSort('name')}>
                    Name {displayArrow('name', sort, order)}
                </button>
                <button className='w-1/5' onClick={() => handleSort('price')}>
                    Price {displayArrow('price', sort, order)}
                </button>
                <button className='w-1/4' onClick={() => handleSort('percent_change_24h')}>
                    24h % {displayArrow('percent_change_24h', sort, order)}
                </button>

            </div>

            {/* Token list */}
            <div className='token-list'>
                {sortedTokens.length > 0 ? (
                    sortedTokens.map(token => (
                        <CoinToken
                            key={token.cmc_rank}
                            cmc_rank={token.cmc_rank}
                            name={token.name}
                            price={token.quote.USD.price}
                            percent_change_24h={token.quote.USD.percent_change_24h}
                            symbol={token.symbol}
                            market_cap_dominance={token.quote.USD.market_cap_dominance}
                        />
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
};

export default Currencies;
