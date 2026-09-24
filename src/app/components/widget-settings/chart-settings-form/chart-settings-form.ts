import { Component, inject, output, signal } from '@angular/core';
import { DashboardStore } from '../../../pages/dashboard/dashboard.store';
import { debounce, form, FormField, required } from '@angular/forms/signals';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor } from '@angular/material/button';

interface ChartForm {
  title: string;
}
@Component({
  imports: [ReactiveFormsModule, FormField, MatFormFieldModule, MatInputModule, MatAnchor],
  selector: 'app-chart-settings-form',
  styleUrl: './chart-settings-form.css',
  templateUrl: './chart-settings-form.html',
})
export class ChartSettingsForm {
  store = inject(DashboardStore);
  closeSettings = output();

  formModel = signal<ChartForm>({
    title: this.store.activeWidgetEditing()?.settings['title']
  })

  chartForm = form(this.formModel, (formModel) => {
    debounce(formModel.title, 500);
    required(formModel.title);
  })

  updateChartSettings(event: Event) {
    event.preventDefault();
    this.store.updateWidgetSettings({title: this.formModel().title}, this.store.activeWidgetEditing()?.id)
    this.closeSettings.emit();
  }
}
