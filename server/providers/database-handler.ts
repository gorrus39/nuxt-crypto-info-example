import { drizzle } from "drizzle-orm/node-postgres";
import { priceHistory } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { CurrencySource, NewPriceHistoryRecord } from "~/types";

const db = drizzle(process.env.DATABASE_URL!);

export const getItems = async (currencySource: CurrencySource) => {
  return await db
    .select()
    .from(priceHistory)
    .where(eq(priceHistory.currencySource, currencySource))
    .orderBy(priceHistory.targetDate);
};

export const deleteItems = async (currencySource: CurrencySource) => {
  return await db
    .delete(priceHistory)
    .where(eq(priceHistory.currencySource, currencySource));
};

export const insertItems = async (items: NewPriceHistoryRecord[]) => {
  return await db.insert(priceHistory).values(items).returning();
};
