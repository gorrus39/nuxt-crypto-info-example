import z from "zod";

const dateIntegerSchema = z.number().int();
const priceValueFloatSchema = z.number();

export const responseCoingeckoSchema = z
  .object({
    prices: z.array(z.tuple([dateIntegerSchema, priceValueFloatSchema])),
  })
  .catchall(z.any());

const PriceValueFloatString = z.string().regex(/^\d+(\.\d+)?$/);

export const responseKrakenSchema = z.object({
  error: z.array(z.any()),
  result: z.object({
    XXBTZUSD: z.array(
      z.tuple([
        dateIntegerSchema,
        z.string(),
        z.string(),
        z.string(),
        z.string(),
        PriceValueFloatString,
        z.string(),
        z.number(),
      ])
    ),
    last: z.number(),
  }),
});

export const responseBitstampSchema = z.object({
  data: z.object({
    ohlc: z.array(
      z
        .object({
          timestamp: z.number(), // DateInteger
          open: z.string(), // PriceValueFloatString
        })
        .catchall(z.any())
    ),
  }),
});

export const currencySourceSchema = z.enum(["coingeco", "kraken", "bitstamp"]);
