import { bringMarketPrice } from "../api/api";
import { MarketPrice } from "../model/MarketPrice";

export const requestMarketPrice = async () => {
  const { data, isError } = await bringMarketPrice();

  // Todo: 실패 처리 UI
  if (isError) {
    console.error("failed fetch");
    return;
  }

  // success
  const krw: MarketPrice[] = data.filter((item: MarketPrice) => item.market.slice(0, item.market.indexOf("-")) === "KRW");
  const btc: MarketPrice[] = data.filter((item: MarketPrice) => item.market.slice(0, item.market.indexOf("-")) === "BTC");
  const usdt: MarketPrice[] = data.filter((item: MarketPrice) => item.market.slice(0, item.market.indexOf("-")) === "USDT");

  return {
    krw,
    usdt,
    btc,
  };
};
