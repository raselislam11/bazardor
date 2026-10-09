"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductCard, { ProductSkeletonGrid } from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";
import { getCategory, getProducts } from "@/lib/api";

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    setLoading(true);
    Promise.all([getCategory(slug).catch(() => null), getProducts(slug).catch(() => [])])
      .then(([c, p]) => {
        setCategory(c);
        setProducts(p);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const sorted = useMemo(() => {
    if (sort === "asc") return [...products].sort((a, b) => a.price - b.price);
    if (sort === "desc") return [...products].sort((a, b) => b.price - a.price);
    return products;
  }, [products, sort]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {loading ? (
        <>
          <div className="skeleton h-9 w-48 mb-6" />
          <ProductSkeletonGrid count={8} />
        </>
      ) : products.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="text-2xl font-bold mb-2">কোনো পণ্য পাওয়া যায়নি</h1>
          <p className="opacity-60 mb-6">এই ক্যাটাগরিতে কিছু নেই অথবা ক্যাটাগরিটি সঠিক নয়।</p>
          <Link href="/" className="btn btn-primary">হোম পেজে ফিরে যান</Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h1 className="text-2xl font-bold">
              {category?.icon} {category?.name || slug}
            </h1>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sorted.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
