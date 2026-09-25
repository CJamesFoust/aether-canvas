import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { delay, of } from "rxjs";
import { KpiMetricData } from "../../shared/models/kpi-metric";
import { MockKpiData } from "../../shared/data/mock-kpi-data";

const MOCK_KPI_DATA: KpiMetricData[] = MockKpiData

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
    
    if (req.url.includes('/api/metrics') && req.method === 'GET') {

        const idsParams = req.params.get('ids');

        let responseData: KpiMetricData[] = [];

        if (idsParams) {
            const requestedIds = idsParams.split(',');
            responseData = MOCK_KPI_DATA.filter(widget => requestedIds.includes(widget.id))
        } else {
            responseData = [...MOCK_KPI_DATA];
        }

        const mockResponse = new HttpResponse({
            status: 200,
            body: responseData
        });

        return of(mockResponse).pipe(delay(800));
    }

    return next(req)
}