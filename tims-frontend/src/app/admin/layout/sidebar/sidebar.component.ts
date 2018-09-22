import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../../shared/models/user';
import { GeneratedFile } from '@angular/compiler';
import { GenericTerm } from '../../generic-term';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {
  user: User;
  generic = new GenericTerm();
  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("auth_token"));
  }

  hideSubmenu($event) {
    $('mat-list-item').removeClass('open');
  }

}
