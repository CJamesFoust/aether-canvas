import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-chart-widget',
  styleUrl: './chart-widget.css',
  templateUrl: './chart-widget.html',
})
export class ChartWidget {
  readonly settings = input<any>({});
}
