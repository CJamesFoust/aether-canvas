export interface WidgetInstance {
    id: string;
    type: string;
    position: {
        x: number;
        y: number;
        cols: number;
        rows: number;
    };
    settings: Record<string, any>;
}
