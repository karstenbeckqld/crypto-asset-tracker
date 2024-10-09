'use client'
// Because of the user interaction for sorting and searching, this component will be rendered on the client side.

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CoinToken from '@/app/components/token';
import useTokens from '@/app/react-query/hooks/useTokens';
import { TokenType } from "@/app/types/CryptoTypes";
import { Input, Search2Icon, Spinner, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"; // Hook to fetch token data

// A Function to display the arrow according to the sort order for the active sorting column.
function displayArrow(sortKey: string, activeSort: string, order: string) {
    // Check if the current column matches the active sort column
    if (sortKey !== activeSort) {
        return <TriangleUpIcon />; // Don't display any arrow if this column isn't the active sort column
    }

    return order === 'asc' ? (
        <TriangleUpIcon color='purple.500' />
    ) : (
        <TriangleDownIcon color='purple.500' />
    );
}

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

function displaySearchField(searchQuery: string, setSearchQuery: (value: string) => void) {
    return (
        <div id='search' className='flex flex-row items-center w-full p-2.5 mt-2.5'>
            <Input
                type='text'
                color='white'
                placeholder='Search by name or symbol...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            />
        </div>
    );
}


const Currencies = () => {

    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isClient, setIsClient] = useState(false); // Track if we are on the client
    const {data, error} = useTokens(); // Fetching token data
    const router = useRouter(); // useRouter from next/navigation
    const searchParams = useSearchParams(); // Get the current search params

    const toggleDisplay = () => {
        setShowSearch(!showSearch);
        setSearchQuery("");
    }

    // Ensure this hook runs only on the client side
    useEffect(() => {
        setIsClient(true);
    }, []);

    // If we are on the server side, render nothing
    if (!isClient) {
        return <Spinner />; // Or return a loading spinner if you want
    }

    // Get the sorting key and order from the URL query params (default to cmc_rank and asc)
    const sort = searchParams.get('sort') || 'cmc_rank';
    const order = searchParams.get('order') || 'asc';

    // Handle sorting change
    const handleSort = (key: string) => {
        const newOrder = order === 'asc' ? 'desc' : 'asc'; // Toggle sorting order
        // Update the query params with the new sort key and order
        const params = new URLSearchParams(searchParams);
        params.set('sort', key);
        params.set('order', newOrder);
        router.push(`?${params.toString()}`); // Use `push` to navigate with updated query
    };

    // Sorting function (sort by cmc_rank, name, price, or 24h %)
    const sortData = (tokens: TokenType[], key: string, order: 'asc' | 'desc') => {
        return [...tokens].sort((a, b) => {
            let aValue, bValue;

            // Determine the value to sort by based on the key
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
                // Default to sorting by cmc_rank
                aValue = a.cmc_rank;
                bValue = b.cmc_rank;
            }

            if (aValue < bValue) return order === 'asc' ? -1 : 1;
            if (aValue > bValue) return order === 'asc' ? 1 : -1;
            return 0;
        });
    };

    // Filter tokens by search query (case-insensitive match for name or symbol)
    const filteredTokens = data ? data.filter((token) =>
        token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];
    // Sort the data based on query params
    const sortedTokens = sortData(filteredTokens, sort as string, order as 'asc' | 'desc');


    return (
        <div>
            {/* Error handling */} {error && <div>Error: {error.message}</div>}

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
