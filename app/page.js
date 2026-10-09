"use client";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ProductCard, { ProductSkeletonGrid } from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 pt-12 scroll-mt-24">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="opacity-60 mb-5">{subtitle}</p>}
      {!subtitle && <div className="mb-5" />}
      {children}
    </section>
  );
}

function Grid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const risers = [...products].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...products].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <>
      <Hero />

      <Section title="আজ দাম বেড়েছে ▲">
        {loading ? <ProductSkeletonGrid count={4} /> : <Grid items={risers} />}
      </Section>

      <Section title="আজ দাম কমেছে ▼">
        {loading ? <ProductSkeletonGrid count={4} /> : <Grid items={fallers} />}
      </Section>

      <Section id="সব-পণ্য" title="সব পণ্য" subtitle="আজকের বাজারে পাওয়া সব পণ্যের দাম">
        {loading && <ProductSkeletonGrid count={8} />}
        {!loading && error && (
          <p className="text-center py-16 opacity-60">ডেটা লোড করা যায়নি। পেজ রিফ্রেশ করে দেখুন।</p>
        )}
        {!loading && !error && <Grid items={products} />}
      </Section>
    </>
  );
}
