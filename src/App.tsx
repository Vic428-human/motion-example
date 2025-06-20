import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCoinPrices } from "./hooks/useApplication.tsx"; // <-- 引入

function App() {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  // const [prices, setPrices] = useState<{ [id: string]: number }>({});

  const coins = [
    { id: "bitcoin", symbol: "BTC", name: "Bitcoin" },
    { id: "ethereum", symbol: "ETH", name: "Ethereum" },
    { id: "solana", symbol: "SOL", name: "Solana" },
  ];

  const { data: prices = {}, isLoading } = useCoinPrices(coins);

  // Skelton loading state
  if (isLoading) {
    return (
      <div style={{ display: "flex", gap: 16 }}>
        {coins.map((coin) => (
          <div
            key={coin.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 16,
              minWidth: 120,
              height: 60,
              background: "#eee",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0.7,
            }}
          >
            <div
              style={{
                width: 40,
                height: 16,
                background: "#ddd",
                borderRadius: 4,
                marginBottom: 8,
              }}
            />
            <div
              style={{
                width: 60,
                height: 20,
                background: "#ddd",
                borderRadius: 4,
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2>加密貨幣價格面板 (motion實作)</h2>
      <div style={{ display: "flex", gap: 16 }}>
        {coins.map((coin) => {
          const price = prices[coin.id] ?? 0;
          // 判斷是否超過門檻
          let isHigh = false;
          if (coin.id === "bitcoin" && price > 100000) isHigh = true;
          if (coin.id === "ethereum" && price > 2500) isHigh = true;
          if (coin.id === "solana" && price > 130) isHigh = true;

          // 根據情境決定閃爍顏色
          const colorArray = isHigh
            ? [
                "#ffe6e6", // 淡紅
                "#f2b2b2", // 中間紅
                "#f44336", // 深紅
                "#f2b2b2",
                "#ffe6e6",
              ]
            : [
                "#e6ffe6", // 淡綠
                "#b2f2b2", // 中間綠
                "#4caf50", // 深綠
                "#b2f2b2",
                "#e6ffe6",
              ];

          return (
            <motion.div
              key={coin.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 16,
                cursor: "pointer",
                minWidth: 120,
                textAlign: "center",
              }}
              animate={{
                backgroundColor: colorArray,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              onClick={() => {
                setSelectedList((prev) => [...prev, coin.id]);
              }}
            >
              <b>{coin.symbol}</b>
              <div>${prices[coin.id] ?? "載入中..."}</div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedList.map((selected) => (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            style={{
              marginTop: 24,
              padding: 24,
              background: "#f0f0f0",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              maxWidth: 320,
            }}
          >
            <button
              onClick={() =>
                setSelectedList((prev) => prev.filter((id) => id !== selected))
              }
              style={{ float: "right" }}
            >
              關閉
            </button>
            <h3>
              {coins.find((c) => c.id === selected)?.name} (
              {coins.find((c) => c.id === selected)?.symbol})
            </h3>
            <p>現價：${prices[selected]}</p>
          </motion.div>
        ))}
      </AnimatePresence>
      {/* <h1>Demo</h1>
      {renderContent()}
      <h3>queryClient.getQueriesData 方式直接調用</h3>
      {applicationQueryData ? (
        <pre>{JSON.stringify(applicationQueryData, null, 2)}</pre>
      ) : (
        <p>No cached data found in queryClient.</p>
      )} */}
    </div>
  );
}

export default App;
