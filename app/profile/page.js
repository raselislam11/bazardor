"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending || !session) {
    return (
      <section className="px-4 py-12 flex justify-center">
        <div className="skeleton h-64 w-full max-w-md" />
      </section>
    );
  }

  const { user } = session;
  return (
    <section className="px-4 py-12 flex justify-center">
      <div className="card bg-base-100 border border-base-300 w-full max-w-md">
        <div className="card-body items-center text-center">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-20 text-3xl">
              {user.image ? <img src={user.image} alt={user.name} /> : <span>{(user.name || "U").charAt(0).toUpperCase()}</span>}
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-2">{user.name}</h1>
          <p className="opacity-60">{user.email}</p>
          <Link href="/profile/update" className="btn btn-primary mt-4">তথ্য আপডেট করুন</Link>
        </div>
      </div>
    </section>
  );
}
