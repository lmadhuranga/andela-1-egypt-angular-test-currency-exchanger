import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-more-details-page',
  templateUrl: './more-details-page.component.html',
  styleUrls: ['./more-details-page.component.css']
})
export class MoreDetailsPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
         
      }
    );
  }

}
