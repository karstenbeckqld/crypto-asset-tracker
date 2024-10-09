import { NextResponse } from "next/server";
import axios from "axios";

// Get the latest cryptocurrency data from the coin market API.
export async function GET() {

    // Make a get request to the coin market API using the API key as custom header.
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?sort=market_cap&sort_dir=desc&limit=25 ', {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_API_KEY,
        },
    });

    // Yhe data comes as object from coin market, why we return the data array here.
    return NextResponse.json(response.data.data);
}
