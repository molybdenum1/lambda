export interface Status {
  timestamp: Date;
  error_code: number;
  error_message?: any;
  elapsed: number;
  credit_count: number;
  notice?: any;
  total_count: number;
}

export interface USD {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl?: any;
  last_updated: Date;
}

export interface Quote {
  USD: USD;
}

export interface Datum {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: Date;
  tags: string[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  platform?: any;
  cmc_rank: number;
  self_reported_circulating_supply?: any;
  self_reported_market_cap?: any;
  tvl_ratio?: any;
  last_updated: Date;
  quote: Quote;
}

export interface CoinMarketCapObject {
  status: Status;
  data: Datum[];
}
