import { Type } from "@angular/core";

export interface WidgetManifest<TSettings = any> {
    type: string;
    name: string;
    description: string;
    loadComponent: () => Promise<Type<any>> | Type<any>;
    getDefaultTitle: (settings: TSettings) => string;
}