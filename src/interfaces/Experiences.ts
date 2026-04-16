export interface Experience {
  id: string;
  destinationSlug: string;
  destinationName: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  priceFormatted: string;
  images: string[];
  image: string;
  category: string;
  title_english: string;
  rating: number;
  reviewCount?: number;
  slug?: string;
}