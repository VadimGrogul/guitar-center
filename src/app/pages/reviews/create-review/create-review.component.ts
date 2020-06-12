import { Component, Inject, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from "@angular/forms";
import { ReviewsService } from "../../../shared/services/reviews.service";
import { Review } from "../../../shared/interfaces/review.interface";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {
  public reviewForm: FormGroup;
  public readyToClose = null;
  public starRating: number;

  public loading = false;

  constructor(
    private _reviewService: ReviewsService,
    private _dialogRef: MatDialogRef<CreateReviewComponent>,
    private _auth: AuthService,
    @Inject(MAT_DIALOG_DATA) private _data: {id: number}
  ) { }

  ngOnInit(): void {


    this.reviewForm = new FormGroup({
      rating: new FormControl(this.starRating, [Validators.required]),
      comment: new FormControl(null, [Validators.required]),
      benefits: new FormControl(null, [Validators.required]),
      limitations: new FormControl(null, [Validators.required]),
    })

  }

  postReview() {
    this.loading = true;

    const review: Review = {
      ...this.reviewForm.value,
      name: this._auth.user.displayName,
      email: this._auth.user.email,
      date: new Date()
    }

    this._reviewService.postReview(this._data.id, review)
      .subscribe(_ => {
        this.loading = false;
        this._dialogRef.close()
      })
  }

  setRating(rating) {
    this.reviewForm.get('rating').setValue(rating);
    this.starRating = rating;
  }

}
