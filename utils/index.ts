import { data as bitstampData } from "~/data/bitstamp";
import { data as coingecoData } from "~/data/coingeco";
import { data as krakenData } from "~/data/kraken";
import {
  responseBitstampSchema,
  responseCoingeckoSchema,
  responseKrakenSchema,
} from "~/schemas";
import {
  type CurrencySource,
  type DateRange,
  type NewPriceHistoryRecord,
  type PriceHistoryRecord,
  type ResponseBitstamp,
  type ResponseCoingeco,
  type ResponseKraken,
} from "~/types";

const dateFormatter = (date: Date, format: string = "yyyy-mm-dd"): string => {
  const day = String(date.getDate());
  const month = String(date.getMonth() + 1);
  const year = String(date.getFullYear());

  switch (format) {
    case "yyyy-mm-dd":
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    default:
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
};

const filterByMaxElements = <T>({
  items,
  max,
}: {
  items: T[];
  max: number;
}): T[] => {
  if (items.length < max) return items;

  const filteredItems = items.filter((_, index) => index % 2 === 0);
  return filterByMaxElements({ items: filteredItems, max });
};

const _formatBitstampData = (
  data: ResponseBitstamp,
  currencySource: CurrencySource,
  currencyType: string = "btc_to_usd"
): NewPriceHistoryRecord[] => {
  const response = responseBitstampSchema.parse(data);

  return response.data.ohlc.map((rawItem) => ({
    targetDate: String(new Date(rawItem.timestamp * 1000).toISOString()),
    currencyType,
    currencySource,
    price: rawItem.open,
  }));
};

const _formatCoingeckoData = (
  data: ResponseCoingeco,
  currencySource: CurrencySource,
  currencyType: string = "btc_to_usd"
): NewPriceHistoryRecord[] => {
  const response = responseCoingeckoSchema.parse(data);

  return response.prices.map((rawItem) => ({
    targetDate: String(new Date(rawItem[0]).toISOString()),
    currencyType,
    currencySource,
    price: String(rawItem[1].toFixed(2)),
  }));
};
const _formatKrakenData = (
  data: ResponseKraken,
  currencySource: CurrencySource,
  currencyType: string = "btc_to_usd"
): NewPriceHistoryRecord[] => {
  const response = responseKrakenSchema.parse(data);

  return response.result.XXBTZUSD.map((rawItem) => ({
    targetDate: String(new Date(rawItem[0] * 1000).toISOString()),
    currencyType,
    currencySource,
    price: rawItem[1],
  }));
};
const getFormattedRemoteItems = async (
  currencySource: CurrencySource
): Promise<{ error?: string; items?: NewPriceHistoryRecord[] }> => {
  try {
    switch (currencySource) {
      case "bitstamp":
        return { items: _formatBitstampData(bitstampData, currencySource) };
      case "coingeco":
        return { items: _formatCoingeckoData(coingecoData, currencySource) };
      case "kraken":
        return { items: _formatKrakenData(krakenData, currencySource) };
      default:
        return { error: `${currencySource} is not implemented` };
    }
  } catch (error) {
    return {
      error: `something went wrong when get remote data. currencySource - ${currencySource}. Error: ${error}`,
    };
  }
};

const filterByDateRange = <T extends PriceHistoryRecord = PriceHistoryRecord>({
  items,
  dateRange,
}: {
  items: T[];
  dateRange: DateRange;
}): T[] => {
  if (dateRange === null) return items;
  const filtered: T[] = [];

  const startDate = new Date(dateRange.start);
  const endDate = new Date(dateRange.end);

  return items.filter((item) => {
    const targetDate = new Date(item.targetDate);
    return targetDate >= startDate && targetDate <= endDate;
  });
};

async function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
export {
  dateFormatter,
  filterByMaxElements,
  filterByDateRange,
  getFormattedRemoteItems,
  sleep,
};
