

const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(value) {
  return String(value).replace(/\d/g, (d) => BN[d]);
}


export function parseNum(value) {
  if (typeof value === "number") return value;
  if (value === null || value === undefined) return 0;
  const en = String(value)
    .replace(/[০-৯]/g, (d) => String(BN.indexOf(d)))
    .replace(/,/g, "")
    .replace(/[^\d.\-]/g, "");
  const n = parseFloat(en);
  return Number.isNaN(n) ? 0 : n;
}

export function formatPrice(n) {
  return toBn(Number(n).toLocaleString("en-US", { maximumFractionDigits: 2 }));
}

export function banglaDate(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
