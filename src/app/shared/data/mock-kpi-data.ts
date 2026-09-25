import { KpiMetricData } from "../models/kpi-metric";

export const MockKpiData: KpiMetricData[] = [
  {
    id: 'kpi-mrr-001',
    metricType: 'MRR',
    label: 'Monthly Recurring Revenue',
    shortLabel: 'MRR',
    currentValue: 128450,
    previousValue: 121100,
    trendPercentage: 6.06,
    trendDirection: 'up',
    comparisonPeriod: 'vs last month',
    sparklineData: [98000, 102000, 109000, 115000, 121100, 128450],
    formatOptions: {
      style: 'currency',
      currency: 'USD',
      notation: 'standard'
    }
  },
  {
    id: 'kpi-arr-001',
    metricType: 'ARR',
    label: 'Annual Recurring Revenue',
    shortLabel: 'ARR',
    currentValue: 1541400,
    previousValue: 1150000,
    trendPercentage: 34.03,
    trendDirection: 'up',
    comparisonPeriod: 'vs last year',
    sparklineData: [850000, 920000, 1050000, 1100000, 1150000, 1541400],
    formatOptions: {
      style: 'currency',
      currency: 'USD',
      notation: 'compact' 
    }
  }
];