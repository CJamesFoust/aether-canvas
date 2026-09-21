import { ComponentRef, Directive, effect, inject, input, ViewContainerRef } from '@angular/core';
import { WidgetInstance } from '../models/widget-instance';
import { KpiWidget } from '../../components/kpi-widget/kpi-widget';
import { ChartWidget } from '../../components/chart-widget/chart-widget';
import { TableWidget } from '../../components/table-widget/table-widget';

@Directive({
  selector: '[WidgetHost]',
  standalone: true,
})
export class WidgetHost {
  private readonly viewContainerRef = inject(ViewContainerRef);
  private componentRef?: ComponentRef<any>;
  readonly widgetConfig = input.required<any>();

  constructor() {

    effect(() => {
      const config = this.widgetConfig();
      const vcr = this.viewContainerRef;

      vcr.clear();

      let componentType: any;

      switch (config.type) {
        case 'KPI_METRIC':
          componentType = KpiWidget;
          break;
        case 'CHART_TIME_SERIES':
          componentType = ChartWidget;
          break;
        case 'TABLE_DATA':
          componentType = TableWidget;
          break;
        default:
          return;
      }

      this.componentRef = this.viewContainerRef.createComponent(componentType);
      this.componentRef.setInput('settings', config.settings);
    });
  }
}
