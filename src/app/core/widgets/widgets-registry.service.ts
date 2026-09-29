import { Injectable } from '@angular/core';
import { WidgetManifest } from './widget-registry.model';
import { KPI_WIDGET_MANIFEST } from '../../components/kpi-widget/kpi-widget.manifest';

@Injectable({ providedIn: 'root' })
export class WidgetRegistryService {
  private manifests = new Map<string, WidgetManifest<any>>();

  constructor() {
    this.register(KPI_WIDGET_MANIFEST);
  }

  register(manifest: WidgetManifest) {
    this.manifests.set(manifest.type, manifest);
  }

  get(type: string): WidgetManifest | undefined {
    return this.manifests.get(type);
  }

  getDefaultTitle(type: string, settings: any): string {
    const manifest = this.get(type);
    return manifest ? manifest.getDefaultTitle(settings) : 'Untitled Widget';
  }
}