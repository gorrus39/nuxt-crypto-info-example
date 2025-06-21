import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { priceHistory } from "~/server/db/schema";

export const useDb = () => {
  const db = drizzle(process.env.DATABASE_URL!);

  function getItems() {}
  function postItems() {}
  function deleteItems() {}

  return db;
};
