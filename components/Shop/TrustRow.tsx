const ITEMS = [
  { icon: "💵", text: "Cash on Delivery" },
  { icon: "🚚", text: "Free shipping on 2+ jars & gift box" },
  { icon: "🔒", text: "Secure Shopify checkout" },
];

export default function TrustRow({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "dark" ? "rgba(243,236,226,0.75)" : "rgba(61,28,8,0.75)";
  const border = tone === "dark" ? "rgba(243,236,226,0.14)" : "rgba(111,55,30,0.15)";
  return (
    <ul className="flex flex-wrap gap-2">
      {ITEMS.map((i) => (
        <li
          key={i.text}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.7rem] font-semibold"
          style={{ color, border: `1px solid ${border}` }}
        >
          <span aria-hidden>{i.icon}</span>
          {i.text}
        </li>
      ))}
    </ul>
  );
}
