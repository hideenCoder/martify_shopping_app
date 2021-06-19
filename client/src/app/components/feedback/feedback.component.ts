import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mg-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  constructor() { }
  showfeedback:boolean=false
  
  ngOnInit(): void {
  }
  togglefeedback()
  {
    this.showfeedback=!this.showfeedback
  }

}
