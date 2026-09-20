import { WidgetInstance } from "../../shared/models/widget-instance";
import { SignalStore } from '@r'

interface DashboardState {
    widgets: WidgetInstance[];
    isEditMode: false;
}

const initialState: DashboardState = {
    isEditMode: false,
    widgets: [
        {
            id: 'widget-kpi-1',
            type: 'KPI_METRIC',
            position: { x: 0, y: 0, cols: 3, rows: 2},
            settings: { title: 'Active Users', refreshRate: 5000 }
        },
        {
            id: 'widget-chart-1',
            type: 'CHART_TIME_SERIES',
            position: { x: 3, y: 0, cols: 6, rows: 4},
            settings: { title: 'System Response Time', range: '24h' }
        }
    ]
};

export const DashboardStore = signalStore()