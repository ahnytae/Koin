import React, { useEffect, useState } from "react";
import LoadingSpinner from "../component/LoadingSpinner";
import MarketView from "../component/MarketView";
import useInterval from "../hook/useInterval";
import usePrevious from "../hook/usePrevious";
import { MarketPrice } from "../model/MarketPrice";
import { MarketTicker } from "../model/MarketTicker";
import { requestMarketPrice } from "../service/requestMarketPrice";
import { requestMarketTicker } from "../service/requestMarketTicker";
import { MarketType } from "../type/type";

const MarketContainer = () => {
  const [krw, setKrw] = useState<MarketPrice[]>();
  const [btc, setBtc] = useState<MarketPrice[]>();
  const [usdt, setUsdt] = useState<MarketPrice[]>();
  const [tickerData, setTickerData] = useState<MarketTicker[]>();

  const prevTickerData = usePrevious<MarketTicker[]>(tickerData);

  // 마켓 탭 전환
  const [tabSelected, setTabSelected] = useState<MarketType>("KRW");
  const changeTabHandler = (market: MarketType) => setTabSelected(market);
  const fetchData = async () => {
    const marketList = await requestMarketPrice();
    setKrw(marketList.krw);
    setBtc(marketList.btc);
    setUsdt(marketList.usdt);
  };

  const fetchTicker = async () => {
    const ticker = await requestMarketTicker(selectedTab());
    setTickerData(ticker);
  };

  const selectedTab = (): MarketPrice[] => {
    switch (tabSelected) {
      case "KRW":
        return krw;
      case "BTC":
        return btc;
      case "USDT":
        return usdt;
      default:
        const checkArg: never = tabSelected;
        return checkArg;
    }
  };

  // 거래대금 정렬 state
  const [isTradeCost, setTradeCost] = useState(false);
  const [isCurrentPrice, setCurrentPrice] = useState(false);
  const [isPrevPercent, setPrevPercent] = useState(false);

  useEffect(() => {
    // 종목 조회
    fetchData();
  }, []);

  useEffect(() => {
    // 시세 조회
    fetchTicker();
  }, [tabSelected]);

  // polling
  useInterval(() => {
    fetchTicker();
  }, 5000);

  // 거래대금 정렬
  const sortCost = () => {
    setTradeCost((isTradeCost) => !isTradeCost);
    sessionStorage.setItem("sortType", `${!isTradeCost ? "isTradeCost" : ""}`);

    if (!isTradeCost) {
      setTickerData(tickerData.sort((a: MarketTicker, b: MarketTicker) => a.acc_trade_price_24h - b.acc_trade_price_24h));
      return;
    }
    setTickerData(tickerData.sort((a: MarketTicker, b: MarketTicker) => b.acc_trade_price_24h - a.acc_trade_price_24h));
    return;
  };

  // 현재가 정렬
  const sortCurrentPrice = () => {
    setCurrentPrice((isCurrentPrice) => !isCurrentPrice);
    sessionStorage.setItem("sortType", `${!isCurrentPrice ? "isCurrentPrice" : ""}`);

    if (!isCurrentPrice) {
      setTickerData(tickerData.sort((a: MarketTicker, b: MarketTicker) => a.trade_price - b.trade_price));
      return;
    }
    setTickerData(tickerData.sort((a: MarketTicker, b: MarketTicker) => b.trade_price - a.trade_price));
    return;
  };

  // 전일대비 정렬
  const sortPrevPercent = () => {
    setPrevPercent((isPrevPercent) => !isPrevPercent);
    sessionStorage.setItem("sortType", `${!isPrevPercent ? "isPrevPercent" : ""}`);

    if (!isPrevPercent) {
      setTickerData(tickerData.sort((a: MarketTicker, b: MarketTicker) => a.signed_change_rate - b.signed_change_rate));
      return;
    }
    setTickerData(tickerData.sort((a: MarketTicker, b: MarketTicker) => b.signed_change_rate - a.signed_change_rate));
    return;
  };
  console.log("prev Data", prevTickerData);
  return (
    <>
      {prevTickerData !== undefined ? (
        <MarketView
          krw={krw}
          btc={btc}
          usdt={usdt}
          tabSelected={tabSelected}
          changeTabHandler={changeTabHandler}
          tickerData={tickerData}
          isTradeCost={isTradeCost}
          isCurrentPrice={isCurrentPrice}
          isPrevPercent={isPrevPercent}
          sortCost={sortCost}
          sortCurrentPrice={sortCurrentPrice}
          sortPrevPercent={sortPrevPercent}
          prevTickerData={prevTickerData}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default MarketContainer;
