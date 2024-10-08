import axios from "axios";
import {useQuery} from "@tanstack/react-query";

interface Token {
    cmc_rank: number;
    name: string;
    symbol: string;
    price: number;
    percent_change_24h: number;
}

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