import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-convert-history',
  templateUrl: './convert-history.component.html',
  styleUrls: ['./convert-history.component.css']
})
export class ConvertHistoryComponent implements OnInit {
  @Input() convertHistory:any; 
  constructor() { }

  ngOnInit(): void {
  }

}
