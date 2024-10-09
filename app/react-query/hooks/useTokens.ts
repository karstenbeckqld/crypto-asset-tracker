import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {TokenType} from "@/app/types/CryptoTypes";

// Get the latest cryptocurrency data from the project API.
const useTokens = () => {
    const fetchTokens = () =>
        axios
            .get<TokenType[]>('api/assets')
            .then((res) => res.data);

    return useQuery<TokenType[], Error>({
        queryKey: ['tokens'],
        queryFn: fetchTokens,
    });
}

export default useTokens;