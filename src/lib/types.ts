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