
/**
 * Formats a number as Indian Rupee
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formats a number as a percentage
 */
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

/**
 * Calculate upsell revenue metrics
 */
export interface UpsellInputs {
  currentCustomers: number;
  averageRevenue: number;
  upsellConversionRate: number;
  upsellAverageValue: number;
  growthRate: number;
  timeframe: number;
}

export interface UpsellResults {
  baselineRevenue: number;
  upsellRevenue: number;
  totalRevenue: number;
  upsellPercentage: number;
  monthlyData: {
    month: number;
    baselineRevenue: number;
    upsellRevenue: number;
    totalRevenue: number;
    customers: number;
  }[];
}

export function calculateUpsellMetrics(inputs: UpsellInputs): UpsellResults {
  const { 
    currentCustomers, 
    averageRevenue, 
    upsellConversionRate, 
    upsellAverageValue, 
    growthRate, 
    timeframe 
  } = inputs;

  // Initialize monthly data array
  const monthlyData = [];
  let customers = currentCustomers;
  
  // Calculate metrics for each month
  for (let month = 1; month <= timeframe; month++) {
    // Calculate monthly growth factor
    customers = Math.round(customers * (1 + growthRate / 100));
    
    // Calculate revenue components
    const baselineRevenue = customers * averageRevenue;
    const upsellRevenue = customers * (upsellConversionRate / 100) * upsellAverageValue;
    const totalRevenue = baselineRevenue + upsellRevenue;
    
    // Add data for this month
    monthlyData.push({
      month,
      baselineRevenue,
      upsellRevenue,
      totalRevenue,
      customers
    });
  }
  
  // Calculate totals over the timeframe
  const lastMonth = monthlyData[monthlyData.length - 1];
  const baselineRevenue = lastMonth.baselineRevenue;
  const upsellRevenue = lastMonth.upsellRevenue;
  const totalRevenue = lastMonth.totalRevenue;
  const upsellPercentage = (upsellRevenue / totalRevenue) * 100;
  
  return {
    baselineRevenue,
    upsellRevenue,
    totalRevenue,
    upsellPercentage,
    monthlyData
  };
}
