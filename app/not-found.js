import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-28 text-center">
      <p className="text-7xl font-bold text-primary mb-4">৪০৪</p>
      <h1 className="text-2xl font-bold mb-2">পেজটি খুঁজে পাওয়া যায়নি</h1>
      <p className="opacity-60 mb-8">আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে নেওয়া হয়েছে।</p>
      <Link href="/" className="btn btn-primary">হোম পেজে ফিরে যান</Link>
    </section>
  );
}
