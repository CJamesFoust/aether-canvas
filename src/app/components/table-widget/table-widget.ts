import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-table-widget',
  styleUrl: './table-widget.css',
  templateUrl: './table-widget.html',
})
export class TableWidget {
  readonly settings = input<any>({});
}
