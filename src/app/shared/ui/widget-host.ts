import { Directive, effect, inject, input, ViewContainerRef } from '@angular/core';
import { WidgetInstance } from '../models/widget-instance';
import { KpiWidget } from '../../components/kpi-widget/kpi-widget';
import { ChartWidget } from '../../components/chart-widget/chart-widget';

@Directive({
  selector: '[WidgetHost]',
  standalone: true,
})
export class WidgetHost {
  public viewContainerRef = inject(ViewContainerRef);

  widgetConfig = input.required<WidgetInstance>();

  constructor() {
    effect(() => {
      const config = this.widgetConfig();
      const vcr = this.viewContainerRef;

      vcr.clear();

      if (config.type === 'KPI_METRIC') {
        const compRef = vcr.createComponent(KpiWidget);
        compRef.setInput('config', config.settings);
      } else if (config.type === 'CHART_TIME_SERIES') {
        const compRef = vcr.createComponent(ChartWidget);
        compRef.setInput('config', config.settings);
      }
    });
  }
}
