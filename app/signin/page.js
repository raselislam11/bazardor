"use client";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (params.get("reason") === "protected") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
    }
  }, [params]);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email")?.toString().trim();
    const password = form.get("password")?.toString();

    if (!email || !password) return toast.error("ইমেইল ও পাসওয়ার্ড দিন");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) return toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(params.get("redirect") || "/");
    router.refresh();
  }

  return (
    <div className="card bg-base-100 border border-base-300 w-full max-w-md">
      <div className="card-body">
        <h1 className="text-2xl font-bold mb-2">সাইন ইন</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
          <input name="password" type="password" placeholder="পাসওয়ার্ড" className="input input-bordered w-full" />
          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
          </button>
        </form>
        <div className="divider text-xs">অথবা</div>
        <SocialButtons />
        <p className="text-sm text-center mt-3">
          অ্যাকাউন্ট নেই? <Link href="/signup" className="link link-primary">সাইন আপ করুন</Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <section className="px-4 py-12 flex justify-center">
      <Suspense fallback={<div className="skeleton h-96 w-full max-w-md" />}>
        <SignInForm />
      </Suspense>
    </section>
  );
}
