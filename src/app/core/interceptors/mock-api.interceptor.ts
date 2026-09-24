import { HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { delay, of } from "rxjs";

const MOCK_KPI_DATA: any[] = [
    {
        test: 'success'
    }
]

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
    
    if ( req.url.includes('/api/metrics') && req.method === 'GET') {
        const mockResponse = new HttpResponse({
            status: 200,
            body: MOCK_KPI_DATA
        });

        console.log('[Mock APU] Intercepted GET /api/metrics');

        return of(mockResponse).pipe(delay(800));
    }

    return next(req)
}