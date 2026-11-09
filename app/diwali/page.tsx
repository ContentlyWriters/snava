import { permanentRedirect } from "next/navigation";

// The Diwali sale ended on 8 Nov 2026. Old links to /diwali (posts, ads)
// now land on The Classic Duo gift box page instead of a dead sale page.
export default function DiwaliPage() {
  permanentRedirect("/products/snava-gift-box");
}
