import { Component, OnInit, Input } from '@angular/core';
import { SalesItem } from '../../../shared/models/sales-item';
import { SalesOrder } from '../../../shared/models/sales-order';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent implements OnInit {

 @Input() salesItems:SalesItem[];
  visible:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
