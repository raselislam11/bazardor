"use client";

export const SORT_OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortDropdown({ value, onChange }) {
  const current = SORT_OPTIONS.find((o) => o.value === value);
  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-sm btn-outline gap-2">
        সাজান: {current.label}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box shadow w-52 p-2 z-30">
        {SORT_OPTIONS.map((o) => (
          <li key={o.value}>
            <button
              className={o.value === value ? "active" : ""}
              onClick={() => {
                onChange(o.value);
                document.activeElement?.blur();
              }}
            >
              {o.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
