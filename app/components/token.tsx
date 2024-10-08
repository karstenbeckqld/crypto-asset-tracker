"use client"

import React from 'react';

interface TokenData {
    cmc_rank: number;
    name: string;
    price: number;
    percent_change_24h: number;
}

interface TokenProps {
    token: TokenData;
}

const CoinToken = ({cmc_rank, name, price, percent_change_24h}: TokenData) => {
        return (
            <div className='flex p-5 bg-neutral-900 mb-5 text-slate-50'>
                <div className='flex-none w-1/4'>{cmc_rank}</div>
                <div className='flex-1 w-1/4'>{name}</div>
                <div className='flex-1 w-1/4'>${price.toFixed(2)}</div>
                <div className='flex-1 w-1/4'>{percent_change_24h.toFixed(2)}</div>
            </div>
        );
    }
;

export default CoinToken;