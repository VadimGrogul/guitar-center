import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { CreateReviewComponent } from "./create-review/create-review.component";
import { ReviewsService } from "../../shared/services/reviews.service";
import { Review } from "../../shared/interfaces/review.interface";
import { AlertComponent } from "./create-review/create-alert/alert.component";
import { AuthService } from "../../shared/services/auth.service";
import { AuthComponent } from "../auth/auth.component";


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input() guitarReviews: Review[];
  @Input() guitarId: number;

  constructor(
    private _dialog: MatDialog,
    private _reviewsService: ReviewsService,
    private _auth: AuthService,
  ) { }


  ngOnInit(): void {
    this._reviewsService.postReviewSubj.subscribe(res => {
      if (res) {
        this.guitarReviews.push(res);
        this._dialog.open(AlertComponent)
      }
    })
  }

  openDialog() {
    const dialogRef = this._dialog.open(CreateReviewComponent, {
      data: {
        id: this.guitarId
      },
      autoFocus: false
    });

    // dialogRef.afterClosed().subscribe(result => {
    //
    // });
  }

  createReview() {
    if (this._auth.isLoggedIn) {
      this.openDialog();
    } else  {
      this._dialog.open(AuthComponent, {
        width: '40%',
        autoFocus: false,
        data: {
          needLogin: 'Войдите, что бы оставить отзыв!',
          guitarId: this.guitarId
        }
      });
    }
  }

}
