export default function Marquee() {
  const items = [
    "Free shipping on all combo orders.", "Order Now — Limited Stock", "Limited Time Offer",
    "Only a Few Left — Hurry!", "Grab Yours Before It's Gone",
    "Free shipping on all combo orders.", "Order Now — Limited Stock", "Limited Time Offer",
    "Only a Few Left — Hurry!", "Grab Yours Before It's Gone",
  ];

  return (
    <div className="bg-[#8FD4F1] overflow-hidden py-3 border-y-1 border-[#5bbce3]">
      <div className="flex whitespace-nowrap animate-marquee">
        {items.map((item, i) => (
          <span key={i} className="font-[family-name:var(--font-dm)] italic text-[#3d1c08] text-sm px-6 flex items-center gap-2">
            {item}
            <span className="text-[#A2452B] not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
