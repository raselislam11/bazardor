"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম খালি রাখা যাবে না");

    setLoading(true);
    // BetterAuth docs: authClient.updateUser({ name })
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
  }

  if (isPending) {
    return (
      <section className="px-4 py-12 flex justify-center">
        <div className="skeleton h-56 w-full max-w-md" />
      </section>
    );
  }

  return (
    <section className="px-4 py-12 flex justify-center">
      <div className="card bg-base-100 border border-base-300 w-full max-w-md">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-2">তথ্য আপডেট করুন</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="নাম"
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : "আপডেট করুন"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
