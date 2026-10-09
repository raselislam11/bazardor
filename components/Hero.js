export default function Hero() {
  return (
    <section className="bg-base-100 border-b border-base-300">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-secondary font-semibold text-sm mb-2">আজকের বাজার দর</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            প্রয়োজনীয় পণ্যের দাম, <span className="text-primary">এক নজরে</span>
          </h1>
          <p className="opacity-70 mb-6 max-w-md">
            চাল, ডাল, তেল, সবজি, মাছ-মাংস — দৈনন্দিন বাজারের সব দাম এক জায়গায়। কোন পণ্যের দাম বাড়ল আর কোনটার কমল, দেখে নিন সহজেই।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary">সব পণ্য দেখুন ↓</a>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-3 gap-4 text-6xl md:text-7xl bg-base-200 rounded-3xl p-8 w-full max-w-sm justify-items-center">
            {["🍚", "🧅", "🐟", "🥚", "🥔", "🍗"].map((e) => (
              <span key={e}>{e}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
