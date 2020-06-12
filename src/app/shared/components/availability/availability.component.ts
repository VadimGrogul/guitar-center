import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent implements OnInit {
  @Input() guitar;

  constructor() { }

  ngOnInit(): void {
  }

}
