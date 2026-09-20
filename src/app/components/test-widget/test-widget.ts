import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-test-widget',
  imports: [],
  templateUrl: './test-widget.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './test-widget.css',
})
export class TestWidget {
  title = input<string>('');
}
