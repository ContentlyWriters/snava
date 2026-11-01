import { permanentRedirect } from "next/navigation";

// Renamed to The Chocoholic Box. Kept only so old links still work.
export default function CacaoLoversBoxRedirect() {
  permanentRedirect("/products/chocoholic-box");
}
