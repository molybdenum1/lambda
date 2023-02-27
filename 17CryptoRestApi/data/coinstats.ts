export interface Coin {
    id: string;
    icon: string;
    name: string;
    symbol: string;
    rank: number;
    price: number;
    priceBtc: number;
    volume: number;
    marketCap: number;
    availableSupply: any;
    totalSupply: any;
    priceChange1h: number;
    priceChange1d: number;
    priceChange1w: number;
    websiteUrl: string;
    twitterUrl: string;
    exp: string[];
    contractAddress: string;
    decimals?: number;
    redditUrl: string;
}

export interface CoinStatsObject {
    coins: Coin[];
}