import { db } from "~/server/db/client";
import { priceHistory } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { PriceHistoryRecord } from "~/types";
import { getFormattedRemoteItems, sleep } from "~/utils";
import { currencySourceSchema } from "~/schemas";

export default defineEventHandler(
  async (event): Promise<{ error?: string; data?: PriceHistoryRecord[] }> => {
    try {
      const currencySourceRaw = getQuery(event).currencySource;
      const currencySource = currencySourceSchema.parse(currencySourceRaw);

      const records = await db
        .select()
        .from(priceHistory)
        .where(eq(priceHistory.currencySource, currencySource))
        .orderBy(priceHistory.targetDate);

      if (records.length > 0)
        throw new Error(
          `database from ${currencySource} source is already populated!`
        );

      const { error: getRemoteDataError, items } =
        await getFormattedRemoteItems(currencySource);

      if (getRemoteDataError) return { error: getRemoteDataError };

      const result = await db.insert(priceHistory).values(items!).returning();

      // искусственная задержка для отображения
      await sleep(1000);

      return { data: result };
    } catch (e) {
      const error = e instanceof Error ? e.message : String(e);
      return { error };
    }
  }
);
