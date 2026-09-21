import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-kpi-widget',
  styleUrl: './kpi-widget.css',
  templateUrl: './kpi-widget.html',
})
export class KpiWidget {
  readonly settings = input<any>({});
}
