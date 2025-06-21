import { db } from "~/server/db/client";
import { priceHistory } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { PriceHistoryRecord } from "~/types";
import { currencySourceSchema } from "~/schemas";
import { sleep } from "~/utils";

export default defineEventHandler(
  async (event): Promise<{ error?: string; data?: PriceHistoryRecord[] }> => {
    const currencySourceRaw = getQuery(event).currencySource;

    let currencySource;
    try {
      currencySource = currencySourceSchema.parse(currencySourceRaw);
    } catch (error) {
      return { error: String(error) };
    }

    const result = await db
      .select()
      .from(priceHistory)
      .where(eq(priceHistory.currencySource, currencySource))
      .orderBy(priceHistory.targetDate);

    // искусственная задержка для отображения
    await sleep(1000);

    return { data: result };
  }
);
