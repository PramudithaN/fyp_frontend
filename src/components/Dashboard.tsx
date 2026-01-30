import { useState, useEffect } from 'react';
import { PredictionResponse } from '../types/api';

const API_URL = 'http://localhost:8002/predict';

function Dashboard() {
  const [data, setData] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: PredictionResponse = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch predictions');
      console.error('Error fetching predictions:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };

  const formatReturn = (returnValue: number): string => {
    const percentage = (returnValue * 100).toFixed(2);
    return `${returnValue >= 0 ? '+' : ''}${percentage}%`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-[#8b949e] text-xl">Loading predictions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-[#f85149] text-xl font-semibold">Error</h3>
          <p className="text-[#e6edf3]">{error}</p>
          <button 
            onClick={fetchPredictions}
            className="bg-[#238636] hover:bg-[#2ea043] text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-[#8b949e] text-xl">No data available</div>
      </div>
    );
  }

  const priceChange = data.forecasts.length > 0 
    ? data.forecasts[0].forecasted_price - data.last_price 
    : 0;
  const priceChangePercent = data.last_price > 0 
    ? (priceChange / data.last_price) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      <div className="w-full px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-[fadeIn_0.5s_ease-in]">
          <p className="text-[#8b949e] text-sm mb-2">NY Mercantile - Delayed Quote - USD</p>
          <h1 className="text-4xl font-semibold tracking-tight">Brent Crude Oil Last Day Financ (BZ=F)</h1>
        </div>

        {/* Price Section */}
        <div className="mb-10 pb-8 border-b border-[#30363d] animate-[fadeIn_0.6s_ease-in]">
          <div className="flex items-baseline gap-4 mb-3">
            <span className="text-6xl font-semibold tracking-tight">{formatPrice(data.last_price)}</span>
            <span className={`text-2xl font-medium ${priceChange >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
              {priceChange >= 0 ? '+' : ''}{formatPrice(priceChange)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
            </span>
          </div>
          <p className="text-[#8b949e] text-sm mt-2">As of {formatDate(data.last_price_date)} - Market Data</p>
          <p className="text-[#8b949e] text-sm">Source: {data.data_source}</p>
        </div>

        {/* Refresh Button */}
        <div className="mb-8">
          <button 
            onClick={fetchPredictions}
            className="bg-[#238636] hover:bg-[#2ea043] active:translate-y-0 text-white px-6 py-2.5 rounded-md font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Refresh Data
          </button>
        </div>

        {/* Table */}
        <div className="bg-[#161b22] rounded-lg p-6 border border-[#30363d] shadow-lg animate-[fadeIn_0.7s_ease-in] w-full">
          <div className="flex justify-between items-center mb-6 px-4">
            <h2 className="text-xl font-semibold">Price Forecasts</h2>
            <span className="text-[#8b949e] text-sm">Currency in USD</span>
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse text-sm min-w-full table-fixed">
              <thead className="border-b border-[#30363d]">
                <tr className="bg-[#0d1117]">
                  <th className="text-left py-4 px-6 font-semibold uppercase text-xs tracking-wider w-[20%]">Date</th>
                  <th className="text-left py-4 px-6 font-semibold uppercase text-xs tracking-wider w-[20%]">Forecasted Price</th>
                  <th className="text-left py-4 px-6 font-semibold uppercase text-xs tracking-wider w-[15%]">Return</th>
                  <th className="text-left py-4 px-6 font-semibold uppercase text-xs tracking-wider w-[30%]">Change from Current</th>
                  <th className="text-left py-4 px-6 font-semibold uppercase text-xs tracking-wider w-[15%]">Horizon (Days)</th>
                </tr>
              </thead>
              <tbody>
                {data.forecasts.map((forecast, index) => {
                  const changeFromCurrent = forecast.forecasted_price - data.last_price;
                  const changePercent = (changeFromCurrent / data.last_price) * 100;
                  
                  return (
                    <tr 
                      key={index} 
                      className="border-b border-[#21262d] hover:bg-[#21262d] cursor-pointer transition-colors"
                    >
                      <td className="py-4 px-6">{formatDate(forecast.date)}</td>
                      <td className="py-4 px-6 font-semibold font-mono">{formatPrice(forecast.forecasted_price)}</td>
                      <td className={`py-4 px-6 font-semibold ${forecast.forecasted_return >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                        {formatReturn(forecast.forecasted_return)}
                      </td>
                      <td className={`py-4 px-6 font-semibold ${changeFromCurrent >= 0 ? 'text-[#3fb950]' : 'text-[#f85149]'}`}>
                        {changeFromCurrent >= 0 ? '+' : ''}{formatPrice(changeFromCurrent)} 
                        ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%)
                      </td>
                      <td className="py-4 px-6 text-[#8b949e]">{forecast.horizon}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
