import { WidgetManifest } from "../../core/widgets/widget-registry.model";
import { KPIWidgetSettings } from "./kpi-widget";

export const KPI_WIDGET_MANIFEST: WidgetManifest<any> = {
    type: 'kpi-metric',
    name: 'KPI Metric Card',
    description: 'Displays a single business metric with trend indicators',
    loadComponent: () => import('./kpi-widget').then(m => m.KpiWidget),
    getDefaultTitle: (settings: Partial<KPIWidgetSettings>) => {
        if (settings?.title && settings.title.trim() !== '') {
            return settings.title;
        }

        return settings?.kpiType === 'ARR'
            ? 'Annual Recurring Revenue (Arr)'
            : 'Monthly Recurring Revenue (MRR)';
    }
};