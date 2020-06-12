import {Component, Input, OnInit} from '@angular/core';
import {Guitar} from "../../../shared/interfaces/guitar.interface";

@Component({
  selector: 'app-guitar-details',
  templateUrl: './guitar-details.component.html',
  styleUrls: ['./guitar-details.component.scss']
})
export class GuitarDetailsComponent implements OnInit {
  @Input() guitar: Guitar;

  constructor() { }

  ngOnInit(): void {}

}
