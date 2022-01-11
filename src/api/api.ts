import { MarketPrice } from "../model/MarketPrice";
import { MarketTicker } from "../model/MarketTicker";

const BASE_URL = "https://api.upbit.com/v1";

interface Response<T> {
  isError: boolean;
  errorData?: {
    name: string;
    message: string;
  };
  data?: T[];
}

export const bringMarketPrice = async () => {
  try {
    const request = await fetch(`${BASE_URL}/market/all`);
    if (request.ok) {
      const data = await request.json();
      return {
        isError: false,
        data: data,
      };
    }
    return {
      isError: true,
    };
  } catch {
    return {
      isError: true,
    };
  }
};

export const bringMarketTicker = async (market: string) => {
  try {
    const request = await fetch(`${BASE_URL}/ticker?markets=${market}`);
    if (request.ok) {
      const data = await request.json();
      return {
        isError: false,
        data: data,
      };
    }
    return {
      isError: true,
    };
  } catch {
    return {
      isError: true,
    };
  }
};
