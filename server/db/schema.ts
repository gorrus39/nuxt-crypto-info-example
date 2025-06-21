import { pgTable, integer, date, text, numeric } from "drizzle-orm/pg-core";

export const priceHistory = pgTable("price_history", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  targetDate: date("target_date").notNull(),
  currencyType: text("currency_type").notNull(),
  currencySource: text("currency_source").notNull(),
  price: numeric("price").notNull(),
});
