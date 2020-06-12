import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {GuitarsService} from "../../shared/services/guitars.service";
import {switchMap} from "rxjs/operators";
import {Guitar} from "../../shared/interfaces/guitar.interface";
import {CreateReviewComponent} from "../reviews/create-review/create-review.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-guitar-page',
  templateUrl: './guitar-page.component.html',
  styleUrls: ['./guitar-page.component.scss']
})
export class GuitarPageComponent implements OnInit {

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    // "nextArrow": '<span>Prev</span>',
    // "prevArrow": '<span>Next</span>',
    // "centerMode": true,
    // "infinite": true,
    // "autoplay": true
  };

  form: FormGroup;

  public guitar: Guitar;

  constructor(
    private route: ActivatedRoute,
    private guitarsService: GuitarsService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.guitarsService.getGuitarById(params['id'])
      })
    ).subscribe((guitar) => {
      this.guitar = guitar;
    })

    this.form = new FormGroup({
      "name": new FormControl(null),
      "model": new FormControl(null),
      "type": new FormControl(null),
      "price": new FormControl(null),
      "salePrice": new FormControl(null),
      "reviews": new FormControl(null),
      "availability": new FormControl(null),
      "description": new FormControl(null),
      "images": new FormArray([
        new FormControl(null)
      ])
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateReviewComponent, {
      width: '60%',
      data: {
        id: this.guitar.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  addControl() {
    (<FormArray>this.form.controls['images']).push(new FormControl(null))
  }

  removeControl(idx) {
    (this.form.controls['images'] as FormArray).removeAt(idx);
  }


  onSubmit() {
    const guitar: Guitar = this.form.value;
    console.log(this.form.value);
    this.guitarsService.postGuitar(guitar);
    this.form.reset()
  }

}
