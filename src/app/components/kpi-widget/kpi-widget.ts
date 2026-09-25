import { AfterContentInit, AfterViewInit, Component, inject, input, OnInit } from '@angular/core';
import { DashboardStore } from '../../pages/dashboard/dashboard.store';

@Component({
  imports: [],
  selector: 'app-kpi-widget',
  styleUrl: './kpi-widget.css',
  templateUrl: './kpi-widget.html',
})

export class KpiWidget implements OnInit {
  readonly settings = input<any>({});
  readonly kpiType = this.settings().kpiType;
  store = inject(DashboardStore)
  
  ngOnInit() {
    this.store.loadKpiMetrics(['kpi-arr-001']);
  }
}
