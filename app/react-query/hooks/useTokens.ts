import axios from "axios";
import {useQuery} from "@tanstack/react-query";

interface Token {
    quote: any;
    cmc_rank: number;
    name: string;
    symbol: string;
    price: number;
    percent_change_24h: number;
}

// Get the latest cryptocurrency data from the project API.
const useTokens = () => {
    const fetchTokens = () =>
        axios
            .get<Token[]>('api/assets')
            .then((res) => res.data);

    return useQuery<Token[], Error>({
        queryKey: ['tokens'],
        queryFn: fetchTokens
    });
}

export default useTokens;