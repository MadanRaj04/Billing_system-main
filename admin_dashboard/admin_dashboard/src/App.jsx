import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export default function StockManager() {
  const [stock, setStock] = useState({});
  const [adjustments, setAdjustments] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchStock = async () => {
    setLoading(true);
    const stockRef = doc(collection(db, "stock"), "Quantity");
    const stockSnap = await getDoc(stockRef);
    if (stockSnap.exists()) {
      setStock(stockSnap.data());
      setAdjustments(
        Object.fromEntries(Object.keys(stockSnap.data()).map((k) => [k, 0]))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const handleAdjustmentChange = (item, value) => {
    setAdjustments({ ...adjustments, [item]: Number(value) });
  };

  const increment = (item) => {
    const value = adjustments[item] || 0;
    setStock({ ...stock, [item]: stock[item] + value });
  };

  const decrement = (item) => {
    const value = adjustments[item] || 0;
    setStock({ ...stock, [item]: Math.max(0, stock[item] - value) });
  };

  const updateStock = async () => {
    try {
      const stockRef = doc(db, "stock", "Quantity");
      await updateDoc(stockRef, stock);
      setMessage("✅ Stock updated successfully!");
    } catch (error) {
      setMessage("❌ Failed to update stock.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-10 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto w-full">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">
          📦 Stock Manager
        </h1>

        {loading ? (
          <p className="text-center text-lg text-blue-600">Loading stock data...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(stock).map(([item, quantity]) => (
              <div
                key={item}
                className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4 hover:shadow-lg transition duration-200"
              >
                <h2 className="text-xl font-semibold text-blue-700">{item}</h2>
                <p className="text-gray-600">
                  <span className="font-medium">Current Stock:</span>{" "}
                  {quantity}
                </p>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Amount"
                    value={adjustments[item] || ""}
                    onChange={(e) =>
                      handleAdjustmentChange(item, e.target.value)
                    }
                    className="border border-gray-300 rounded px-3 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => increment(item)}
                    className="bg-blue-600 hover:bg-blue-700 text-black px-3 py-1 rounded-lg transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decrement(item)}
                    className="bg-green-600 hover:bg-green-700 text-black px-3 py-1 rounded-lg transition"
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <button
            onClick={updateStock}
            className="bg-green-600 hover:bg-green-700 text-black text-lg px-6 py-2 rounded-xl shadow-md transition"
          >
            💾 Save Stock
          </button>
          {message && (
            <p className="mt-4 text-lg font-medium text-black">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
