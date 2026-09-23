import { WidgetInstance } from "../../shared/models/widget-instance";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'

interface DashboardState {
    widgets: WidgetInstance[];
    isEditMode: boolean;
    activeWidgetEditing: WidgetInstance | null;
}

const initialState: DashboardState = {
    isEditMode: false,
    activeWidgetEditing: null,
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

export const DashboardStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        toggleEditMode() {
            patchState(store, (state) => ({ isEditMode: !state.isEditMode }));
        },

        addWidget(widget: WidgetInstance) {
            patchState(store, (state) => ({
                widgets: [...state.widgets, widget]
            }));
        },

        removeWidget(id: string) {
            patchState(store, (state) => ({
                widgets: state.widgets.filter((w) => w.id !== id)
            }))
        },

        updateWidgetPosition(id: string, newPosition: { x: number; y: number; cols: number; rows: number}) {
            patchState(store, (state) => ({
                widgets: state.widgets.map((w) =>
                    w.id === id ? { ...w, position: { ...w.position, ...newPosition } } : w
                )
            }));
        },

        updateWidgetSettings(newSettings: Record<string, any>, id?: string) {
            patchState(store, (state) => ({
                widgets: state.widgets.map((w) =>
                w.id === id ? {...w, settings: {...w.settings, ...newSettings } } : w
                )
            }))
        },

        updateActiveWidgetEditing(widget?: WidgetInstance) {
            patchState(store, {
                activeWidgetEditing: widget || null
            });
        }
    }))
)