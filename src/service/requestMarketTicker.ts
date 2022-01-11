import { bringMarketTicker } from "../api/api";
import { MarketPrice } from "../model/MarketPrice";
import { MarketTicker } from "../model/MarketTicker";
import { MarketType, SORT_TYPE } from "../type/type";

export const requestMarketTicker = async (market: MarketPrice[]) => {
  let array: any[] = [];

  market?.filter((name) => {
    array = [...array, name.market];
  });

  if (array.length === 0) return;
  const response = await bringMarketTicker(array.join());

  if (response.isError) {
    console.error("failed fetch");
    return;
  }

  // 거대대금 오름차순
  const sortType: keyof typeof SORT_TYPE = sessionStorage.getItem("sortType") as keyof typeof SORT_TYPE;
  if (sortType === SORT_TYPE.isTradeCost) {
    return response.data.sort((a: MarketTicker, b: MarketTicker) => a.acc_trade_price_24h - b.acc_trade_price_24h);
  }

  // 현재가 오름차순
  if (sortType === SORT_TYPE.isCurrentPrice) {
    return response.data.sort((a: MarketTicker, b: MarketTicker) => a.trade_price - b.trade_price);
  }

  // 전일대비 오름차순
  if (sortType === SORT_TYPE.isPrevPercent) {
    return response.data.sort((a: MarketTicker, b: MarketTicker) => a.signed_change_rate - b.signed_change_rate);
  } else {
    // 기본값: 거래대금 내림차순
    return response.data.sort((a: MarketTicker, b: MarketTicker) => b.acc_trade_price_24h - a.acc_trade_price_24h);
  }
};
