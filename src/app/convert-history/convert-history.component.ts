import { Component, OnInit, Input } from '@angular/core';
interface SimpleChanges {
  __index(propName: string): SimpleChanges
}
@Component({
  selector: 'app-convert-history',
  templateUrl: './convert-history.component.html',
  styleUrls: ['./convert-history.component.css']
})
export class ConvertHistoryComponent implements OnInit {
  
  @Input()
  convertHistory:any; 
  @Input()
  popularPairs:any; 
   
  
  constructor() {   
  }
  
  ngOnInit(): void {  
  }
 
}
