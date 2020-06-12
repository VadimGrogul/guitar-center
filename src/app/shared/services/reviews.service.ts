import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Review, ReviewResponse } from "../interfaces/review.interface";
import { map, tap } from "rxjs/operators";
import { Observable, Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class ReviewsService {
  public postReviewSubj: Subject<Review> = new Subject<Review>();

  constructor(
    private _http: HttpClient
  ) {}

  postReview(id: number, review: Review) {
    return this._http.post(`${environment.dbUrl}/guitars/${id}/reviews.json`, review)
      .pipe(
        map((response: ReviewResponse) => {
          return {
            ...review,
            id: +response.name
          }
        }),
        tap((review: Review) => this.postReviewSubj.next(review))
      )
  }

  getReviews(id): Observable<Review[]> {
    return this._http.get<Review[]>(`${environment.dbUrl}/guitars/${id}/reviews.json`)
      .pipe(
        map(guitars => {
          return Object.keys(guitars)
            .map(key => {
              return {
                ...guitars[key],
                id: key
              }
            })
        })
      )
  }
}
