import {
  Component,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { WidgetHost } from '../../shared/ui/widget-host';
import { DashboardStore } from './dashboard.store';

@Component({
  selector: 'app-dashboard',
  imports: [WidgetHost],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard.css',
})
export class Dashboard {
  readonly store = inject(DashboardStore);
}
