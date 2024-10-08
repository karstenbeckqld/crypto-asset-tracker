import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Get the latest cryptocurrency data from the coin market API.
export async function GET(request: NextRequest) {

    // Make a get request to the coin market API using the API key as custom header.
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest ', {
        headers: {
            'X-CMC_PRO_API_KEY': '1281325f-c9b5-4f1f-99bb-a8d9a3105ad6', // Put in.env file later.
        },
    });

    // Yhe data comes as object from coin market, why we return the data array here.
    return NextResponse.json(response.data.data);
}