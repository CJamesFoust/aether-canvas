import { Component, input } from '@angular/core';

@Component({
  selector: 'app-test-widget',
  imports: [],
  templateUrl: './test-widget.html',
  styleUrl: './test-widget.css',
})
export class TestWidget {
  title = input<string>('');
}
