// create tanstack query example for useApplication hook
import { useQuery } from "@tanstack/react-query";

export interface Coin {
  id: string;
}

export interface Prices {
  [id: string]: number;
}

export interface ApplicationData {
  name: string;
  status: string;
}

// 取得幣種價格的 hook
export const useCoinPrices = (coins: Coin[]) => {
  return useQuery<Prices>({
    queryKey: ["coinPrices", coins.map((c) => c.id).join(",")],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 延遲3秒
      const ids = coins.map((c) => c.id).join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      const data = await res.json();
      const newPrices: Prices = {};
      coins.forEach((c) => {
        newPrices[c.id] = data[c.id]?.usd ?? 0;
      });
      return newPrices;
    },
    enabled: coins.length > 0,
    staleTime: 60 * 1000, // 1 minute
    refetchOnWindowFocus: false,
  });
};

// Sample 假數據
const fetchApplication = async (): Promise<ApplicationData> => {
  // 模擬網路請求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "Sample Application",
        status: "active",
      });
    }, 1000);
  });
};

export const useApplication = () => {
  const { data, isLoading, error } = useQuery<ApplicationData>({
    queryKey: ["application"],
    queryFn: fetchApplication,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return { data, isLoading, error };
};
