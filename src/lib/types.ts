export interface ENSDomainData {
  code: number;
  message: string;
  data: {
    address: string;
    expiration_time: string;
    name: string;
    owner: string;
    registrant: string;
    registrant_time: string;
    resolver: string;
    text_records: null;
    token_id: string;
  }[];
}

export interface TxsData {
  block_number: number;
  block_timestamp: string;
  burnt_fee: number;
  contract_address: string;
  cumulative_gas_used: number;
  effective_gas_price: number;
  from_address: string;
  gas: number;
  gas_price: number;
  gas_used: number;
  input: string;
  max_fee_per_gas: number;
  max_priority_fee_per_gas: number;
  nonce: number;
  saving_fee: number;
  status: number;
  to_address: string;
  transaction_hash: string;
  transaction_index: number;
  tx_fee: number;
  type: number;
  value: string;
}

export interface TxsResponse {
  code: number;
  message: string;
  data: TxsData[];
}

export type Token = {
  balance: string;
  contract_address: string;
  current_usd_price: number;
  decimals: number;
  logos: { uri: string }[];
  name: string;
  symbol: string;
  total_supply: string;
  urls: string[];
};

export type TokenResponse = {
  code: number;
  message: string;
  data: Token[];
};

//  NFT
type FloorPrice = {
  address: string;
  symbol: string;
  value: string;
};

type Attribute = {
  trait_type: string;
  value: string;
};

type Metadata = {
  attributes: Attribute[];
  collection: string;
  description: string;
  image: string;
  iyk_metadata_version: string;
  name: string;
};

export type NFTToken = {
  contract_address: string;
  erc_type: string;
  floor_prices: FloorPrice[];
  image_uri: string;
  metadata: Metadata;
  mint_time: string;
  mint_transaction_hash: string;
  name: string;
  owner: string;
  rarity_rank: number;
  rarity_score: number;
  symbol: string;
  token_id: string;
  token_uri: string;
  total: number;
  total_string: string;
  traits: Attribute[];
};

export type NFTTokenResponse = {
  code: number;
  message: string;
  data: NFTToken[];
};
