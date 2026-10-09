"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { formatPrice, toBn } from "@/lib/bn";


export default function PriceTicker() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getProducts().then(setItems).catch(() => {});
  }, []);

  if (items.length === 0) return <div className="h-10 bg-neutral" />;

  const row = [...items, ...items]; // দ্বিগুণ করা হয় যাতে loop seamless হয়
  return (
    <div className="bg-neutral text-neutral-content overflow-hidden h-10 flex items-center">
      <div className="marquee-track gap-8 px-4">
        {row.map((p, i) => (
          <span key={i} className="text-sm whitespace-nowrap flex items-center gap-1">
            <span>{p.emoji}</span>
            <span className="font-medium">{p.name}</span>
            <span>
              {formatPrice(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}
            </span>
            <span className={p.change > 0 ? "text-green-400" : p.change < 0 ? "text-red-400" : "opacity-60"}>
              {p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"} {toBn(Math.abs(p.change).toFixed(1))}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
