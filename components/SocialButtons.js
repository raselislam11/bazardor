"use client";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  async function social(provider) {
    const { error } = await authClient.signIn.social({ provider, callbackURL: "/" });
    if (error) toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
  }

  return (
    <div className="space-y-2">
      <button type="button" onClick={() => social("google")} className="btn btn-outline w-full">
        Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" onClick={() => social("github")} className="btn btn-outline w-full">
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
