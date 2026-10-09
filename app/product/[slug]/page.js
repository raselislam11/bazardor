"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import { formatPrice } from "@/lib/bn";
import { ChangeBadge } from "@/components/ProductCard";

function Stat({ label, value, accent }) {
  return (
    <div className="card bg-base-100 border border-base-300">
      <div className="card-body p-4 items-center text-center">
        <p className="text-xs opacity-60">{label}</p>
        <p className={`text-xl font-bold ${accent || ""}`}>{formatPrice(value)} টাকা</p>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    getProduct(slug)
      .then((p) => (p ? setProduct(p) : setMissing(true)))
      .catch(() => setMissing(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (missing) notFound();

  if (loading || !product) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10 space-y-4">
        <div className="skeleton h-12 w-64" />
        <div className="skeleton h-5 w-96 max-w-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          {[0, 1, 2, 3].map((i) => <div key={i} className="skeleton h-24" />)}
        </div>
        <div className="skeleton h-64" />
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <Link href="/" className="text-sm opacity-60 hover:opacity-100">← হোম পেজ</Link>

      <div className="mt-4 mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <span className="text-5xl">{product.emoji}</span> {product.name}
        </h1>
        {product.description && <p className="opacity-70 mt-2">{product.description}</p>}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {product.categories.map((c) => (
            <span key={c} className="badge badge-outline">{c}</span>
          ))}
          <span className="badge badge-primary">{product.unit}</span>
          <ChangeBadge change={product.change} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Stat label="সর্বনিম্ন দাম" value={product.min} accent="text-success" />
        <Stat label="সর্বোচ্চ দাম" value={product.max} accent="text-error" />
        <Stat label="গড় দাম" value={product.avg} />
        <Stat label="আজকের দাম" value={product.price} accent="text-primary" />
      </div>

      <h2 className="text-xl font-bold mb-3">বাজারভিত্তিক আজকের দাম</h2>
      {product.markets.length === 0 ? (
        <p className="opacity-60">বাজারভিত্তিক তথ্য পাওয়া যায়নি।</p>
      ) : (
        <div className="overflow-x-auto card bg-base-100 border border-base-300">
          <table className="table">
            <thead>
              <tr><th>বাজার</th><th>দাম ({product.unit})</th><th>পরিবর্তন</th></tr>
            </thead>
            <tbody>
              {product.markets.map((m, i) => (
                <tr key={i}>
                  <td>{m.name}</td>
                  <td className="font-semibold">{formatPrice(m.price)} টাকা</td>
                  <td><ChangeBadge change={m.change} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
