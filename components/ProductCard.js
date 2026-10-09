import Link from "next/link";
import { formatPrice, toBn } from "@/lib/bn";

export function ChangeBadge({ change }) {
  const abs = toBn(Math.abs(change).toFixed(1));
  if (change > 0) return <span className="badge badge-success badge-sm text-white">▲ {abs}%</span>;
  if (change < 0) return <span className="badge badge-error badge-sm text-white">▼ {abs}%</span>;
  return <span className="badge badge-ghost badge-sm">— {abs}%</span>;
}

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card bg-base-100 border border-base-300 hover:shadow-lg hover:-translate-y-0.5 transition"
    >
      <div className="card-body p-4 gap-1">
        <div className="text-4xl">{product.emoji}</div>
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-sm opacity-60">{product.unit}</p>
        <div className="flex items-end justify-between mt-2">
          <div>
            <p className="text-xs opacity-60">আজকের দাম</p>
            <p className="font-bold text-primary">{formatPrice(product.price)} টাকা</p>
          </div>
          <ChangeBadge change={product.change} />
        </div>
      </div>
    </Link>
  );
}

export function ProductSkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton h-36 rounded-2xl" />
      ))}
    </div>
  );
}
