"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const password = form.get("password")?.toString();

    if (!name || !email || !password) return toast.error("সব ঘর পূরণ করুন");
    if (password.length < 6) return toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) return toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <section className="px-4 py-12 flex justify-center">
      <div className="card bg-base-100 border border-base-300 w-full max-w-md">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-2">সাইন আপ</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input name="name" type="text" placeholder="নাম" className="input input-bordered w-full" />
            <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
            <input name="password" type="password" placeholder="পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)" className="input input-bordered w-full" />
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : "রেজিস্টার করুন"}
            </button>
          </form>
          <div className="divider text-xs">অথবা</div>
          <SocialButtons />
          <p className="text-sm text-center mt-3">
            আগে থেকেই অ্যাকাউন্ট আছে? <Link href="/signin" className="link link-primary">সাইন ইন করুন</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
