import {Review} from "./review.interface";

export interface Guitar {
  id: number,
  name: string,
  model: string,
  type: string,
  price: number,
  bodyMaterial: string,
  country: string,
  fingerboard: string,
  fretCount: number,
  fretboard: string,
  scale: number,
  stringsCount: number,
  salePrice: number,
  reviews: Array<Review>,
  availability: boolean,
  images: Array<string>,
  description: string
}
