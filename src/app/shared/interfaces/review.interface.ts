export interface Review {
  id: number
  name: string,
  email: string,
  rating: number,
  comment: string,
  benefits: string,
  limitations: string,
  date: Date
}

export interface ReviewResponse {
  name: string
}
