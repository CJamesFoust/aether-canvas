import { Component, inject, output } from '@angular/core';
import { DashboardStore } from '../../pages/dashboard/dashboard.store';
import { KpiSettingsForm } from './kpi-settings-form/kpi-settings-form';
import { ChartSettingsForm } from './chart-settings-form/chart-settings-form';
import { TableSettingsForm } from './table-settings-form/table-settings-form';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  imports: [KpiSettingsForm, ChartSettingsForm, TableSettingsForm, MatButtonModule, MatIcon, MatDividerModule],
  selector: 'app-widget-settings',
  styleUrl: './widget-settings.css',
  templateUrl: './widget-settings.html',
  host: {
    class: 'w-full' 
  }
})
export class WidgetSettings {
  readonly store = inject(DashboardStore);
  closeSettings = output();
}
