export interface ReviewImageUrls {
  original: string;
  small: string;
  compact: string;
  huge?: string;
}

export interface ReviewPicture {
  urls: ReviewImageUrls;
  hidden?: boolean;
}

export interface Reviewer {
  id?: number;
  name: string;
  email?: string;
}

export interface JudgeMeReview {
  id: number;
  rating: number;
  title: string | null;
  body: string;
  reviewer: Reviewer;
  product_title: string;
  product_handle: string;
  verified: string;
  created_at: string;
  pictures: ReviewPicture[];
  featured?: boolean;
}

export interface ReviewsApiResponse {
  success: boolean;
  reviews: JudgeMeReview[];
  total: number;
}
