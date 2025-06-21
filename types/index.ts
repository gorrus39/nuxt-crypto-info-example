import type { z } from "zod";
import type {
  currencySourceSchema,
  responseBitstampSchema,
  responseCoingeckoSchema,
  responseKrakenSchema,
} from "~/schemas";

import type { priceHistory } from "~/server/db/schema";

type USDPrice = number;
type DateString = string;

export type Point = {
  dateString: DateString;
  value: USDPrice;
};

export interface PriceHistoryProvider {
  getItems(): Promise<{ error?: string; items?: PriceHistoryRecord[] }>;
  fetchRemoteItems(): Promise<{ error?: string; items?: PriceHistoryRecord[] }>;
  deleteItems(): Promise<{ error?: string }>;
}

export type Requesting = "GET" | "POST" | "DELETE" | false;
export type DateRange = { start: string; end: string } | null;

export type PriceHistoryApiResponse = {
  error?: string;
  items?: PriceHistoryRecord[];
};

export type ResponseCoingeco = z.infer<typeof responseCoingeckoSchema>;
export type ResponseKraken = z.infer<typeof responseKrakenSchema>;
export type ResponseBitstamp = z.infer<typeof responseBitstampSchema>;
export type CurrencySource = z.infer<typeof currencySourceSchema>;
export type PriceHistoryRecord = typeof priceHistory.$inferSelect;
export type NewPriceHistoryRecord = typeof priceHistory.$inferInsert;
