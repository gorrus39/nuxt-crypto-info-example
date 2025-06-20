import z from "zod";

type USDPrice = number;
type DateString = string;
type DateInteger = number;
type PriceValueFloat = number;
type PriceValueFloatString = string;

export type Point = {
  dateString: DateString;
  value: USDPrice;
};

export type ResponseCoingeco = {
  prices: [DateInteger, PriceValueFloat][];
  [key: string]: any;
};

export type ResponseKraken = {
  error: any[];
  result: {
    XXBTZUSD: [
      DateInteger,
      string,
      string,
      string,
      string,
      PriceValueFloatString,
      string,
      number
    ][];
    last: number;
  };
};

export type ResponseBitstamp = {
  data: {
    ohlc: {
      timestamp: DateInteger;
      open: PriceValueFloatString;
      [key: string]: any;
    }[];
  };
};
