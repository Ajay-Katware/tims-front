import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material';
import { ThemeService } from '../../shared/services/theme.service';
import { DashboardService } from '../../shared/services/dashboard.service';
import { DashboardCounter } from '../../shared/models/dashboard-counter';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  counterDto = new DashboardCounter();
  constructor(private themeService: ThemeService, public dialog: MatDialog, private dashboardService: DashboardService) { 
  }

  ngOnInit() {
   this.counters();
  }

  counters(){
    this.dashboardService.getCounters().subscribe(data => {
      this.counterDto = data;
    })
  }

}