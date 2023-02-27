
export const apiLinks: iApiLink[] = [
  {
    //+
    name: "coinpaprika",
    link: "https://api.coinpaprika.com/v1/tickers",
  },
  {
    //+
    name: "coinmarketcap",
    link: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    headers: 'e320c0a3-b5e4-4a99-8fac-750034ab5716'
  },
  {
    name: "cucoin",
    link: "https://api.kucoin.com/api/v1/market/allTickers",
  },
  {
    //+
    name: "coinstats",
    link: "https://api.coinstats.app/public/v1/coins",
  },
  {
    name: "coinbase",
    link: "https://api.coinbase.com/v2/currencies/crypto",
  },
];

export interface iApiLink {
    name: string,
    link: string,
    headers? : string
}