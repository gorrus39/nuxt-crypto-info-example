import { bitstampProvider } from "~/server/providers/bitstamp";
import { coingecoProvider } from "~/server/providers/coingeco";
import { krakenProvider } from "~/server/providers/kraken";
import { PriceHistoryApiResponse, PriceHistoryProvider } from "~/types";

const providers: Record<string, PriceHistoryProvider> = {
  coingeco: coingecoProvider,
  bitstamp: bitstampProvider,
  kraken: krakenProvider,
};

export default defineEventHandler(
  async (event): Promise<PriceHistoryApiResponse> => {
    const platform = getRouterParam(event, "platform");
    const method = event.node.req.method;
    const provider = providers[platform as string];

    if (!provider) {
      return { error: "Unknown platform" };
    }

    if (method === "GET") {
      return await provider.getItems();
    }

    if (method === "POST") {
      return await provider.fetchRemoteItems();
    }

    if (method === "DELETE") {
      return await provider.deleteItems();
    }

    return { error: "Method not allowed" };
  }
);
