import { Point, PriceHistoryProvider, PriceHistoryRecord } from "~/types";
import { getFormattedRemoteItems, sleep } from "~/utils";
import { deleteItems, getItems, insertItems } from "./database-handler";

const platform = "coingeco";

export const coingecoProvider: PriceHistoryProvider = {
  async getItems(): Promise<{
    error?: string;
    items?: PriceHistoryRecord[];
  }> {
    const result: { error?: string; items?: PriceHistoryRecord[] } = {};
    try {
      result.items = await getItems(platform);
    } catch (e) {
      result.error = e instanceof Error ? e.message : String(e);
    }
    await sleep(1000);
    return result;
  },
  async fetchRemoteItems(): Promise<{
    error?: string;
    items?: PriceHistoryRecord[];
  }> {
    const result: { error?: string; items?: PriceHistoryRecord[] } = {};

    try {
      const records = await getItems(platform);
      if (records.length > 0)
        throw new Error(
          `database from ${platform} source is already populated!`
        );

      const { error: getRemoteDataError, items } =
        await getFormattedRemoteItems(platform);

      if (getRemoteDataError) return { error: getRemoteDataError };
      if (!items) return { error: getRemoteDataError };

      result.items = await insertItems(items);
    } catch (e) {
      result.error = e instanceof Error ? e.message : String(e);
    }

    await sleep(1000);
    return result;
  },
  async deleteItems(): Promise<{ error?: string }> {
    const result: { error?: string } = {};
    try {
      await deleteItems(platform);
    } catch (e) {
      result.error = e instanceof Error ? e.message : String(e);
    }
    await sleep(1000);
    return result;
  },
};
