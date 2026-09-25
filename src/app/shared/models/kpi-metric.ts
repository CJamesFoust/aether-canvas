export interface KpiMetricData {
  id: string;
  metricType: string;
  label: string;             
  shortLabel: string;        
  currentValue: number;      
  previousValue: number;     
  trendPercentage: number;   
  trendDirection: 'up' | 'down' | 'neutral';
  comparisonPeriod: string;  
  sparklineData: number[];   
  formatOptions: {
    style: 'currency' | 'decimal' | 'percent';
    currency?: string;       
    notation?: 'standard' | 'compact'; 
  };
}