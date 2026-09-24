import { Component, inject, output, signal } from '@angular/core';
import { DashboardStore } from '../../../pages/dashboard/dashboard.store';
import { debounce, form, FormField, required } from '@angular/forms/signals';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAnchor } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface TableForm {
  title: string;
}
@Component({
  imports: [FormField, ReactiveFormsModule, MatAnchor, MatFormFieldModule, MatInputModule],
  selector: 'app-table-settings-form',
  styleUrl: './table-settings-form.css',
  templateUrl: './table-settings-form.html',
})
export class TableSettingsForm {
  store = inject(DashboardStore);
  closeSettings = output();

  formModel = signal<TableForm>({
    title: this.store.activeWidgetEditing()?.settings['title'],
  })

  tableForm = form(this.formModel, (formModel) => {
    debounce(formModel.title, 500);
    required(formModel.title);
  });

  updateTableSettings(event: Event) {
    event.preventDefault();
    this.store.updateWidgetSettings({ title: this.formModel().title }, this.store.activeWidgetEditing()?.id);
    this.closeSettings.emit();
  }
}
