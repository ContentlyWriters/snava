export interface JudgeMeReview {
  id: number;
  rating: number;
  title: string;
  body: string;
  reviewer: {
    name: string;
    email?: string;
  };
  product_handle: string;
  product_title: string;
  created_at: string;
  verified: boolean;
  pictures: {
    urls: {
      original: string;
      small: string;
      compact: string;
    };
  }[];
}

export interface JudgeMeResponse {
  reviews: JudgeMeReview[];
  total_reviews: number;
}

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const PUBLIC_TOKEN = process.env.JUDGEME_PUBLIC_TOKEN!;
const PRIVATE_TOKEN = process.env.JUDGEME_PRIVATE_TOKEN!;

export async function getReviews(page = 1, perPage = 12) {
  const url = new URL("https://judge.me/api/v1/reviews");

  url.searchParams.set("api_token", PRIVATE_TOKEN);
  url.searchParams.set("shop_domain", SHOP_DOMAIN);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("per_page", perPage.toString());
  url.searchParams.set("published", "true");

  const res = await fetch(url.toString(), {
    next: {
      revalidate: Number(process.env.REVALIDATE_TIME) || 300,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    console.error(error);

    throw new Error(`Judge.me Error ${res.status}`);
  }

  const data = (await res.json()) as JudgeMeResponse;

  data.reviews = data.reviews.filter(
    (review) => review.product_handle !== "judgeme-shop-reviews"
  );

  return data;
}

