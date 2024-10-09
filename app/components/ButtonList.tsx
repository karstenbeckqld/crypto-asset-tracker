import React, { ReactNode } from 'react';

interface ButtonListProps {
    sort: string;
    order: string;
    handleSort: (sortKey: string) => void;
    displayArrow: (sortKey: string, activeSort:string, order:string) => ReactNode;
}

const ButtonList = ({sort, order, handleSort, displayArrow}: ButtonListProps) => {
    return (
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
    );
};

export default ButtonList;