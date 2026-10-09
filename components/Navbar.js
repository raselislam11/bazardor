"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getCategories } from "@/lib/api";
import { banglaDate } from "@/lib/bn";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(banglaDate()); // client এ set করা হয় যাতে hydration mismatch না হয়
    getCategories().then(setCategories).catch(() => {});
  }, []);

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  }

  return (
    <header className="bg-base-100 border-b border-base-300 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="leading-tight">
          <p className="text-xl font-bold text-primary">🛒 বাজার দর</p>
          <p className="text-xs opacity-60 min-h-4">{date}</p>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`btn btn-sm ${active ? "btn-primary" : "btn-ghost"}`}
              >
                {c.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-8 w-24" />
          ) : session ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-sm btn-ghost gap-2">
                <span className="avatar placeholder">
                  <span className="bg-primary text-primary-content rounded-full w-7">
                    {(session.user.name || "U").charAt(0).toUpperCase()}
                  </span>
                </span>
                <span className="hidden sm:inline">{session.user.name}</span>
              </button>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box shadow w-48 p-2 z-50">
                <li><Link href="/profile">আমার প্রোফাইল</Link></li>
                <li><button onClick={handleSignOut}>সাইন আউট</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm btn-ghost">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-sm btn-primary">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      {/* ছোট স্ক্রিনে category link গুলো দ্বিতীয় row তে scroll হয় */}
      <nav className="lg:hidden flex gap-1 px-4 pb-2 overflow-x-auto">
        {categories.map((c) => {
          const active = pathname === `/category/${c.slug}`;
          return (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className={`btn btn-xs shrink-0 ${active ? "btn-primary" : "btn-ghost"}`}
            >
              {c.name}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
