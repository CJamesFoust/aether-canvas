import { Component, inject, input, output, signal } from '@angular/core';
import { form, FormField, required, debounce } from '@angular/forms/signals';
import { DashboardStore } from '../../../pages/dashboard/dashboard.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WidgetInstance } from '../../../shared/models/widget-instance';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAnchor } from '@angular/material/button';

interface KpiForm {
  title: string;
  refreshRate: number;
}

@Component({
  imports: [FormField, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatAnchor],
  selector: 'app-kpi-settings-form',
  styleUrl: './kpi-settings-form.css',
  templateUrl: './kpi-settings-form.html',
})
export class KpiSettingsForm {
  store = inject(DashboardStore);
  closeSettings = output();

  formModel = signal<KpiForm>({
    title: this.store.activeWidgetEditing()?.settings['title'],
    refreshRate: this.store.activeWidgetEditing()?.settings['refreshRate'],
  })

  kpiForm = form(this.formModel, (formModel) => {
    debounce(formModel.title, 500);
    debounce(formModel.refreshRate, 500);
    required(formModel.title);
    required(formModel.refreshRate)
  });

  updateKpiSettings(event: Event) {
    event.preventDefault();
    this.store.updateWidgetSettings({ title: this.formModel().title, refreshRate: this.formModel().refreshRate }, this.store.activeWidgetEditing()?.id);
    this.closeSettings.emit();
  }
}
