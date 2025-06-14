import { QueryClient } from "@tanstack/react-query";

// retry 這個選項：
// 如果是寫在 queries 裡面 → 控制的是 查詢失敗後的重試行為（用於 useQuery）。
// 如果是寫在 mutations 裡面 → 控制的是 mutation 操作失敗後的重試行為（用於 useMutation）。

export const defaultQueryOptions = {
  defaultOptions: {
    queries: {
      retry:false,
      refetchOnWindowFocus: false, // Do not refetch on window focus      
      refetchOnReconnect: false, // Do not refetch on reconnect      
      // staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
        // retry: 3, 
        // retryDelay: 1000, 
    },    
  }
};

export const queryClient = new QueryClient(defaultQueryOptions);