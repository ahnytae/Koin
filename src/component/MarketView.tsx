import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

// internal
import "../styleSheet/common.css";
import { MarketPrice } from "../model/MarketPrice";
import { MarketType } from "../type/type";
import { MarketTicker } from "../model/MarketTicker";

type Prop = {
  krw: MarketPrice[];
  btc: MarketPrice[];
  usdt: MarketPrice[];
  tabSelected: MarketType;
  changeTabHandler: (market: MarketType) => void;
  tickerData: MarketTicker[];
  isTradeCost: boolean;
  isCurrentPrice: boolean;
  isPrevPercent: boolean;
  sortCost: () => void;
  sortCurrentPrice: () => void;
  sortPrevPercent: () => void;
  prevTickerData: MarketTicker[];
};

const MarketView = ({
  krw,
  btc,
  usdt,
  tabSelected,
  changeTabHandler,
  tickerData,
  isTradeCost,
  isCurrentPrice,
  isPrevPercent,
  sortCost,
  sortCurrentPrice,
  sortPrevPercent,
  prevTickerData,
}: Prop) => {
  const [changeName, setChangeName] = useState(false);

  // (거래대금 정렬 시) 이름 정렬
  const sortName = (data: MarketTicker, language: "ko" | "en", market: MarketType): string => {
    let matchName = "";

    // KRW
    if (market === "KRW") {
      krw?.find((v: MarketPrice) => {
        if (language === "ko") {
          return v.market === data.market ? (matchName = v.korean_name) : "";
        }
        return v.market === data.market ? (matchName = v.english_name) : "";
      });
      return matchName;
    }

    // BTC
    if (market === "BTC") {
      btc?.find((v: MarketPrice) => {
        if (language === "ko") {
          return v.market === data.market ? (matchName = v.korean_name) : "";
        }
        return v.market === data.market ? (matchName = v.english_name) : "";
      });
      return matchName;
    }

    // USDT
    if (market === "USDT") {
      usdt?.find((v: MarketPrice) => {
        if (language === "ko") {
          return v.market === data.market ? (matchName = v.korean_name) : "";
        }
        return v.market === data.market ? (matchName = v.english_name) : "";
      });
      return matchName;
    }
  };

  console.log(
    "0번째 기준 가격 변동 테스트\n",
    "이전 가격:",
    prevTickerData[0].trade_price,
    "변동된 가격:",
    tickerData[0].trade_price,
    prevTickerData[0]?.trade_price > tickerData[0]?.trade_price ? "FALL" : prevTickerData[0]?.trade_price === tickerData[0]?.trade_price ? "EVEN" : "RISE"
  );

  // 현재가 효과 조건 함수
  const highlightFn = (data: MarketTicker, idx: number) => {
    if (prevTickerData[idx]?.market.slice(0, prevTickerData[idx]?.market.indexOf("-")) !== data?.market.slice(0, data?.market.indexOf("-"))) {
      return null;
    } else if (prevTickerData[idx]?.trade_price > data?.trade_price) {
      return "FALL";
    } else if (prevTickerData[idx]?.trade_price === data?.trade_price) {
      return "EVEN";
    }
    return "RISE";
  };

  return (
    <div id="root_container">
      <section className="container">
        <article className="marketB">
          <span className="tab">
            <table>
              <colgroup>
                <col width="33.33%" />
                <col width="33.33%" />
                <col width="auto" />
              </colgroup>
              <tbody>
                <tr>
                  <td className={tabSelected === "KRW" ? "on" : ""} onClick={() => changeTabHandler("KRW")}>
                    <a href="#">원화거래</a>
                  </td>
                  <td className={tabSelected === "BTC" ? "on" : ""} onClick={() => changeTabHandler("BTC")}>
                    <a href="#">BTC</a>
                  </td>
                  <td className={tabSelected === "USDT" ? "on" : ""} onClick={() => changeTabHandler("USDT")}>
                    <a href="#">USDT</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </span>
          <table className="ty01" id="fixTit">
            <colgroup>
              <col width="29" />
              <col width="*" />
              <col width="23%" />
              <col width="19%" />
              <col width="26%" />
            </colgroup>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th className="tit" onClick={() => setChangeName(!changeName)}>
                  <a href="#">{changeName ? "영문명" : "한글명"}</a>
                </th>
                {/* <!-- className: up, down --> */}
                <th className="sortable price" onClick={() => sortCurrentPrice()}>
                  <a href="#" className={isCurrentPrice ? "up" : "down"}>
                    현재가
                  </a>
                </th>
                <th className="sortable percent" onClick={() => sortPrevPercent()}>
                  <a href="#" className={isPrevPercent ? "up" : "down"}>
                    전일대비
                  </a>
                </th>
                <th className="sortable tradecost" onClick={() => sortCost()}>
                  <a href="#" className={isTradeCost ? "up" : "down"}>
                    거래대금
                  </a>
                </th>
              </tr>
            </thead>
          </table>
          <div className="scrollB">
            <table className="ty01">
              <colgroup>
                <col width="29" />
                <col width="*" />
                <col width="23%" />
                <col width="19%" />
                <col width="26%" />
              </colgroup>
              <tbody>
                {/* KRW Market */}
                {tabSelected === "KRW" &&
                  tickerData?.map((data: MarketTicker, idx: number) => (
                    <tr key={data.market} className={data.change === "RISE" ? "up" : data.change === "FALL" ? "down" : ""}>
                      <td className="bar">
                        <div className={data.change === "RISE" ? "up" : data.change === "FALL" ? "down" : ""}>
                          <span className="line" style={{ top: "10px", height: "40%" }}>
                            -
                          </span>
                          <span className="box" style={{ top: "12px", height: "4px" }}>
                            -
                          </span>
                        </div>
                      </td>
                      <td className="tit">
                        {changeName ? <strong>{`${sortName(data, "en", "KRW")}`}</strong> : <strong>{`${sortName(data, "ko", "KRW")}`}</strong>}

                        <em>{krw[idx]?.english_name}/KRW</em>
                      </td>
                      <td className="price">
                        <strong>{data.trade_price > 100 ? data.trade_price.toLocaleString("ko-KR") : data.trade_price.toFixed(2)}</strong>
                        <Highlight isEffect={highlightFn(data, idx)} />
                      </td>
                      <td className="percent">
                        <p>{(data.signed_change_rate * 100).toFixed(2)}%</p>
                      </td>
                      <td className="tradecost">
                        <p>
                          {Math.floor(data.acc_trade_price_24h / 1000000).toLocaleString("ko-KR")}
                          백만
                        </p>
                      </td>
                    </tr>
                  ))}

                {/* BTC Market  */}
                {tabSelected === "BTC" &&
                  tickerData?.map((data: MarketTicker, idx: number) => (
                    <tr key={data.market} className={data.change === "RISE" ? "up" : data.change === "FALL" ? "down" : ""}>
                      <td className="bar">
                        <div className={data.change === "RISE" ? "up" : data.change === "FALL" ? "down" : ""}>
                          <span className="line" style={{ top: "10px", height: "40%" }}>
                            -
                          </span>
                          <span className="box" style={{ top: "12px", height: "4px" }}>
                            -
                          </span>
                        </div>
                      </td>
                      <td className="tit">
                        {changeName ? <strong>{`${sortName(data, "en", "BTC")}`}</strong> : <strong>{`${sortName(data, "ko", "BTC")}`}</strong>}

                        <em>{btc[idx]?.english_name}/BTC</em>
                      </td>
                      <td className="price">
                        <strong>{data.trade_price.toFixed(8)}</strong>
                        <Highlight isEffect={highlightFn(data, idx)} />
                      </td>
                      <td className="percent">
                        <p>{(data.signed_change_rate * 100).toFixed(2)}%</p>
                      </td>
                      <td className="tradecost">
                        <p>{data.acc_trade_price_24h.toLocaleString()}</p>
                      </td>
                    </tr>
                  ))}

                {/* USDT Market  */}
                {tabSelected === "USDT" &&
                  tickerData?.map((data: MarketTicker, idx: number) => (
                    <tr key={data.market} className={data.change === "RISE" ? "up" : data.change === "FALL" ? "down" : ""}>
                      <td className="bar">
                        <div className={data.change === "RISE" ? "up" : data.change === "FALL" ? "down" : ""}>
                          <span className="line" style={{ top: "10px", height: "40%" }}>
                            -
                          </span>
                          <span className="box" style={{ top: "12px", height: "4px" }}>
                            -
                          </span>
                        </div>
                      </td>
                      <td className="tit">
                        {changeName ? <strong>{`${sortName(data, "en", "USDT")}`}</strong> : <strong>{`${sortName(data, "ko", "USDT")}`}</strong>}

                        <em>{usdt[idx]?.english_name}/USDT</em>
                      </td>
                      <td className="price">
                        <strong>{data.trade_price.toFixed(3)}</strong>
                        <Highlight isEffect={highlightFn(data, idx)} />
                      </td>
                      <td className="percent">
                        <p>{(data.signed_change_rate * 100).toFixed(2)}%</p>
                      </td>
                      <td className="tradecost">
                        <p>{Math.floor(data.acc_trade_price_24h).toLocaleString()}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
};

export default MarketView;

const up = keyframes`
  from {
    border: 1px orangered solid;
    position: absolute;
    top: 4px;
    right: 0;
    width: 86px;
    height: 36px;
    overflow: hidden;
    text-indent: -999em;
  }

  to {
    border: 1px red solid;
    position: absolute;
    top: 4px;
    right: 0;
    width: 86px;
    height: 36px;
    overflow: hidden;
    text-indent: -999em;
`;

const down = keyframes`
  from {
    border: 1px skyblue solid;
    position: absolute;
    top: 4px;
    right: 0;
    width: 86px;
    height: 36px;
    overflow: hidden;
    text-indent: -999em;
  }

  to {
    border: 1px blue solid;
    position: absolute;
    top: 4px;
    right: 0;
    width: 86px;
    height: 36px;
    overflow: hidden;
    text-indent: -999em;
  }
`;

const Highlight = styled.span<{ isEffect: "RISE" | "FALL" | "EVEN" }>`
  ${({ isEffect }) =>
    isEffect === "RISE"
      ? css`
          animation: ${up} 1s;
        `
      : isEffect === "FALL"
      ? css`
          animation: ${down} 1s;
        `
      : css``}
`;
