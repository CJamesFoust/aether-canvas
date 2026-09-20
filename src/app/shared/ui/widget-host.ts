import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[WidgetHost]',
})
export class WidgetHost {
  public viewContainerRef = inject(ViewContainerRef);

  constructor() {}
}
