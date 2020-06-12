import { Guitar } from "./guitar.interface";

type Prices = {
  price: number,
  salePrice: number
}

export interface BasketItem {
  product: Guitar,
  count: number,
  prices: Prices
}
