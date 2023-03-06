export interface Crypto {
    code: string;
    name: string;
    symbol: string;
    exchange: string
    Now: number;
    hourAgo: number;
    dayAgo: number;
    weekAgo: number;
}
export interface YourList {
    id: number,
    username: string,
    coin: string}