import { Component, ChangeDetectionStrategy, inject, viewChild, ElementRef } from '@angular/core';
import { WidgetHost } from '../../shared/ui/widget-host';
import { DashboardStore } from './dashboard.store';
import { WidgetInstance } from '../../shared/models/widget-instance';
import { CdkDropList, moveItemInArray, CdkDrag, CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  imports: [WidgetHost, CdkDropList, CdkDrag],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly store = inject(DashboardStore);

  gridContainer = viewChild<ElementRef>('gridContainer');

  onDragEnded(event: CdkDragEnd, widget: any) {
    const element = event.source.element.nativeElement;
    const transform = element.style.transform;

    const match = transform.match(/translate3d\(([-\d.]+)px,\s*([-\d.]+)px/);
    if (!match) {
      event.source.reset();
      return;
    }

    const deltaX = parseFloat(match[1]);
    const deltaY = parseFloat(match[2]);

    const gridEl = this.gridContainer()?.nativeElement;
    const colWidth = gridEl ? gridEl.clientWidth / 12 : 80;
    const rowHeight = 80;

    const colsMoved = Math.round(deltaX / colWidth);
    const rowsMoved = Math.round(deltaY / rowHeight);

    let newX = widget.position.x + colsMoved;
    let newY = widget.position.y + rowsMoved;

    newX = Math.max(0, Math.min(newX, 12 - widget.position.cols));
    newY = Math.max(0, newY);

    const currentWidgets = this.store.widgets();
    const hasCollision = this.checkCollision(newX, newY, widget.position.cols, widget.position.rows, widget.id, currentWidgets)

    if (!hasCollision) {
      this.store.updateWidgetPosition(widget.id, {
        x: newX,
        y: newY,
        cols: widget.position.cols,
        rows: widget.position.rows
      });
    }


    event.source.reset();
  }

  private checkCollision(
    targetX: number,
    targetY: number,
    cols: number,
    rows: number,
    widgetId: string,
    allWidgets: WidgetInstance[]
  ): boolean {
    const targetLeft = targetX;
    const targetRight = targetX + cols;
    const targetTop = targetY;
    const targetBottom = targetY + rows;

    for (const w of allWidgets) {
      if ( w.id === widgetId ) continue;

      const wLeft = w.position.x;
      const wRight = w.position.x + w.position.cols;
      const wTop = w.position.y;
      const wBottom = w.position.y + w.position.rows;

      const isOverlapping =
        targetLeft < wRight &&
        targetRight > wLeft &&
        targetTop < wBottom &&
        targetBottom > wTop;
      
      if (isOverlapping) {
        return true;
      }
    }

    return false
  }

  onDrop(event: CdkDragDrop<any[]>) {
    const widgets = [...this.store.widgets()];

    moveItemInArray(widgets, event.previousIndex, event.currentIndex);
  }

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
