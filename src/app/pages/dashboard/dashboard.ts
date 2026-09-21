import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { WidgetHost } from '../../shared/ui/widget-host';
import { DashboardStore } from './dashboard.store';
import { WidgetInstance } from '../../shared/models/widget-instance';

@Component({
  selector: 'app-dashboard',
  imports: [WidgetHost],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly store = inject(DashboardStore);

  addNewKpi() {
    const currentWidgets = this.store.widgets();
    const totalColumns = 12;
    const newCols = 3;
    const newRows = 2;

    let nextX = 0;
    let nextY = 0;

    if (currentWidgets.length > 0) {
      const lastWidget = currentWidgets[currentWidgets.length - 1];
      const tentativeX = lastWidget.position.x + lastWidget.position.cols;

      if ( tentativeX + newCols <= totalColumns) {
        nextX = tentativeX;
        nextY = lastWidget.position.y;
      } else {
        nextX = 0;
        nextY = Math.max(...currentWidgets.map((w) => w.position.y + w.position.rows));
      }

    }

    const newWidget: WidgetInstance = {
      id: `widget-kpi-${crypto.randomUUID()}`,
      type: 'KPI_METRIC',
      position: { x: nextX, y: nextY, cols: newCols, rows: newRows },
      settings: { title: 'Server CPU Usage', refreshRate: 3000 },
    };

    this.store.addWidget(newWidget);
  }

  deleteWidget(id: string) {
    this.store.removeWidget(id);
  }
}
