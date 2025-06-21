import { db } from "~/server/db/client";
import { priceHistory } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { currencySourceSchema } from "~/schemas";
import { sleep } from "~/utils";

export default defineEventHandler(
  async (event): Promise<{ error?: string }> => {
    const currencySourceRaw = getQuery(event).currencySource;

    const { data: currencySource, error } =
      currencySourceSchema.safeParse(currencySourceRaw);

    if (!currencySource) return { error: String(error) };

    try {
      await db
        .delete(priceHistory)
        .where(eq(priceHistory.currencySource, currencySource));
    } catch (error) {
      return { error: String(error) };
    }

    // искусственная задержка для отображения
    await sleep(1000);

    return {};
  }
);
