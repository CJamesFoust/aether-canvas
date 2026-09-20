import { Component, OnInit, viewChild, ViewContainerRef } from '@angular/core';
import { WidgetHost } from '../../shared/ui/widget-host';
import { TestWidget } from '../../components/test-widget/test-widget';

@Component({
  selector: 'app-dashboard',
  imports: [WidgetHost],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  host = viewChild(WidgetHost)


  ngOnInit(): void {
    const vcr: ViewContainerRef | undefined = this.host()?.viewContainerRef;

    if (vcr) {
      vcr.clear();
      const child = vcr.createComponent(TestWidget)
      child.setInput('title', 'Dynamic Widget')
    }
  }
}
