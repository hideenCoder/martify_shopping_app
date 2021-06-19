import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'mg-catagory-list',
  templateUrl: './catagory-list.component.html',
  styleUrls: ['./catagory-list.component.scss']
})
export class CatagoryListComponent implements OnInit {

  constructor(private homeComponent: HomeComponent) { }

  ngOnInit(): void {
  }

  getCatagory(cat){
    this.homeComponent.getCatProd(cat)
    console.log(cat)
  }

}
