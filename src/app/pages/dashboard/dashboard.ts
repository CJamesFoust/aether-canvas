import { Component, ChangeDetectionStrategy, inject, viewChild, ElementRef, signal } from '@angular/core';
import { WidgetHost } from '../../shared/ui/widget-host';
import { DashboardStore } from './dashboard.store';
import { WidgetInstance } from '../../shared/models/widget-instance';
import { moveItemInArray, CdkDrag, CdkDragDrop, CdkDragEnd } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { WidgetSettings } from '../../components/widget-settings/widget-settings';

@Component({
  selector: 'app-dashboard',
  imports: [WidgetHost, FormsModule, CdkDrag, MatSidenavModule, MatIconModule, MatButtonModule, CommonModule, WidgetSettings],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly store = inject(DashboardStore);
  readonly activeConfigWidget = signal<any | null>(null);
  readonly opened = signal(false);

  gridContainer = viewChild<ElementRef>('gridContainer');

  trackEvent(isOpen: string) {
    console.log(isOpen);
  }

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

  private calculateNextPosition(newCols: number, newRows: number) {
    const currentWidgets = this.store.widgets();
    const totalColumns = 12;

    if (currentWidgets.length === 0) {
      return { x: 0, y: 0, cols: newCols, rows: newRows };
    }

    const lastWidget = currentWidgets[currentWidgets.length - 1];
    const tentativeX = lastWidget.position.x + lastWidget.position.cols;

    if (tentativeX + newCols <= totalColumns) {
      return {
        x: tentativeX,
        y: lastWidget.position.y,
        cols: newCols,
        rows: newRows
      };
    } else {
      return {
        x: 0,
        y: Math.max(...currentWidgets.map(w => w.position.y + w.position.rows)),
        cols: newCols,
        rows: newRows
      };
    }
  }

  onDrop(event: CdkDragDrop<any[]>) {
    const widgets = [...this.store.widgets()];

    moveItemInArray(widgets, event.previousIndex, event.currentIndex);
  }

  addNewKpi() {
    this.store.addWidget({
      id: crypto.randomUUID(),
      type: 'KPI_METRIC',
      position: this.calculateNextPosition(3, 2),
      settings: { title: 'New KPI', refreshRate: 3000, kpiType: 'ARR' }
    });
   }
  

  addNewTable() {
    this.store.addWidget({
      id: crypto.randomUUID(),
      type: 'TABLE_DATA',
      position: this.calculateNextPosition(6, 3),
      settings: { title: 'System Health Status' }
    });
  }

  deleteWidget(id: string) {
    this.store.removeWidget(id);
  }

  openSettings(widget: any) {
    this.activeConfigWidget.set(widget);
    this.store.updateActiveWidgetEditing(widget);
    this.opened.set(true);
  }

  closeSettings() {
    this.activeConfigWidget.set(null);
    this.store.updateActiveWidgetEditing();
    this.opened.set(false);
  }

  saveSettings(formValues: { title: string; refreshRate?: number }) {
    const widget = this.activeConfigWidget();
    if (!widget) return;

    this.store.updateWidgetSettings({
      title: formValues.title,
      refreshRate: formValues.refreshRate ? Number(formValues.refreshRate) : widget.settings.refreshRate
    }, widget.id);

    this.closeSettings();
  }
}
