import { useEffect, useRef } from "react";
import { MarketTicker } from "../model/MarketTicker";

function usePrevious<T>(value: MarketTicker[]): T {
  const ref: any = useRef<MarketTicker[]>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
