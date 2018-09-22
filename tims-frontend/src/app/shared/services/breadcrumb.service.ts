import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Breadcrumb } from '../models/breadcrumb';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  _addItem = new Subject<Breadcrumb>();

  constructor(private router: Router) { }

  addItem(label: string, href: string = this.router.url): void {
    this._addItem.next(new Breadcrumb(label, href));
  }

}
