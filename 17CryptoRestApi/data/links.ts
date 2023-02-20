
export const apiLinks: iApiLink[] = [
  {
    name: "coinpaprika",
    link: "https://api.coinpaprika.com/v1/coins",
  },
  {
    name: "cucoin",
    link: "https://api.kucoin.com/api/v1/currencies/",
  },
  {
    name: "coinstats",
    link: "https://api.coinstats.app/public/v1/coins",
  },
  {
    name: "coinbase",
    link: "https://api.coinbase.com/v2/currencies/crypto",
  },
];

interface iApiLink {
    name: string,
    link: string
}