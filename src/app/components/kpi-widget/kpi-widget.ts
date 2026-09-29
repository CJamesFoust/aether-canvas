import { Component, computed, effect, inject, input, OnInit, signal } from '@angular/core';
import { DashboardStore } from '../../pages/dashboard/dashboard.store';
import { KpiMetricData } from '../../shared/models/kpi-metric';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SparklineComponent } from '../sparkline/sparkline';

export interface KPIWidgetSettings {
  id: string;
  kpiType: 'ARR' | 'MRR';
  title?: string;
}

@Component({
  imports: [CurrencyPipe, MatIconModule, SparklineComponent],
  selector: 'app-kpi-widget',
  styleUrl: './kpi-widget.css',
  templateUrl: './kpi-widget.html',
})
export class KpiWidget {
  readonly settings = input.required<KPIWidgetSettings>();
  private readonly store = inject(DashboardStore);
  readonly loading = this.store.metricsLoading;
  readonly lineColor = computed(() => {
    return this.metric()?.trendDirection === 'up'
      ? '#3572b4'
      : '#f43f5e'
  })

  readonly metric = computed(() => {{
    const kpiType = this.settings().kpiType;

    return this.store
      .metrics()
      .find(metric => metric.metricType === kpiType)
  }})
}
