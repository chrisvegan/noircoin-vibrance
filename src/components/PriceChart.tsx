import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for the price chart
const data = [
  { date: '2024-01-01', price: 29000, high: 29500, low: 28500, volume: 1500 },
  { date: '2024-01-02', price: 30000, high: 30500, low: 29500, volume: 1800 },
  { date: '2024-01-03', price: 31000, high: 31500, low: 30500, volume: 2000 },
  { date: '2024-01-04', price: 30500, high: 31200, low: 30000, volume: 1700 },
  { date: '2024-01-05', price: 31500, high: 32000, low: 30800, volume: 2200 },
  { date: '2024-01-06', price: 32000, high: 32500, low: 31500, volume: 2500 },
  { date: '2024-01-07', price: 32500, high: 33000, low: 32000, volume: 2800 },
  { date: '2024-01-08', price: 33000, high: 33500, low: 32500, volume: 3000 },
  { date: '2024-01-09', price: 33500, high: 34000, low: 33000, volume: 3200 },
  { date: '2024-01-10', price: 34000, high: 34500, low: 33500, volume: 3500 },
  { date: '2024-01-11', price: 34500, high: 35000, low: 34000, volume: 3800 },
  { date: '2024-01-12', price: 35000, high: 35500, low: 34500, volume: 4000 },
  { date: '2024-01-13', price: 35500, high: 36000, low: 35000, volume: 4200 },
  { date: '2024-01-14', price: 36000, high: 36500, low: 35500, volume: 4500 },
  { date: '2024-01-15', price: 36500, high: 37000, low: 36000, volume: 4800 },
];

// Mock data for price comparison chart
const comparisonData = [
  { date: '2024-01-01', btc: 29000, eth: 1800, ltc: 75 },
  { date: '2024-01-02', btc: 30000, eth: 1900, ltc: 80 },
  { date: '2024-01-03', btc: 31000, eth: 2000, ltc: 85 },
  { date: '2024-01-04', btc: 30500, eth: 1950, ltc: 82 },
  { date: '2024-01-05', btc: 31500, eth: 2050, ltc: 88 },
  { date: '2024-01-06', btc: 32000, eth: 2100, ltc: 90 },
  { date: '2024-01-07', btc: 32500, eth: 2150, ltc: 92 },
];

// Mock data for volume chart
const volumeData = [
  { date: '2024-01-01', volume: 1500 },
  { date: '2024-01-02', volume: 1800 },
  { date: '2024-01-03', volume: 2000 },
  { date: '2024-01-04', volume: 1700 },
  { date: '2024-01-05', volume: 2200 },
  { date: '2024-01-06', volume: 2500 },
  { date: '2024-01-07', volume: 2800 },
];

// CustomTooltip for the price chart - Fix for TypeScript error by properly typing the props
const CustomTooltip = ({ active, payload, label }: { 
  active?: boolean; 
  payload?: Array<any>; 
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip bg-black/90 p-4 rounded-lg border border-white/20 shadow-xl backdrop-blur-sm">
        <p className="label text-white/70 text-sm">{new Date(data.date).toLocaleDateString()}</p>
        <p className="font-bold text-green-400">${Number(data.price).toLocaleString()}</p>
        <p className="text-sm text-white/70">
          High: <span className="text-white">${Number(data.high).toLocaleString()}</span>
        </p>
        <p className="text-sm text-white/70">
          Low: <span className="text-white">${Number(data.low).toLocaleString()}</span>
        </p>
        <p className="text-sm text-white/70 mt-1">
          Volume: <span className="text-white">${Number(data.volume).toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Custom tooltip for the comparison chart
const ComparisonTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip bg-black/90 p-4 rounded-lg border border-white/20 shadow-xl backdrop-blur-sm">
        <p className="label text-white/70 text-sm">{new Date(data.date).toLocaleDateString()}</p>
        <p className="font-bold text-yellow-400">
          BTC: <span className="text-white">${Number(data.btc).toLocaleString()}</span>
        </p>
        <p className="font-bold text-blue-400">
          ETH: <span className="text-white">${Number(data.eth).toLocaleString()}</span>
        </p>
        <p className="font-bold text-purple-400">
          LTC: <span className="text-white">${Number(data.ltc).toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Volume chart tooltip - Fix for TypeScript error by properly typing the props
const VolumeTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip bg-black/90 p-4 rounded-lg border border-white/20 shadow-xl backdrop-blur-sm">
        <p className="label text-white/70 text-sm">{new Date(data.date).toLocaleDateString()}</p>
        <p className="font-bold text-white">${Number(data.volume).toLocaleString()}</p>
        <p className="text-sm text-white/70 mt-1">
          Trading Volume for <span className="text-orange-400">Bitcoin</span>
        </p>
      </div>
    );
  }
  return null;
};

// Change the title of the third tab to "BTC Volume"
const PriceChart = () => {
  
  return (
    <div className="text-white">
      <Tabs defaultValue="chart">
        <TabsList className="w-full max-w-md mx-auto mb-6 bg-white/5">
          <TabsTrigger value="chart" className="flex-1">BTC Price</TabsTrigger>
          <TabsTrigger value="comparison" className="flex-1">Price Comparison</TabsTrigger>
          <TabsTrigger value="volume" className="flex-1">BTC Volume</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#fff" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis stroke="#fff" tickFormatter={(price) => `$${price.toLocaleString()}`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} name="Price" />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="comparison">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#fff" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis stroke="#fff" tickFormatter={(price) => `$${price.toLocaleString()}`} />
              <Tooltip content={<ComparisonTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="btc" stroke="#ffc857" strokeWidth={2} name="Bitcoin" />
              <Line type="monotone" dataKey="eth" stroke="#3b82f6" strokeWidth={2} name="Ethereum" />
              <Line type="monotone" dataKey="ltc" stroke="#a855f7" strokeWidth={2} name="Litecoin" />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="volume">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#fff" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis stroke="#fff" tickFormatter={(volume) => `$${volume.toLocaleString()}`} />
              <Tooltip content={<VolumeTooltip />} />
              <Legend />
              <Bar dataKey="volume" fill="#f97316" name="Volume" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PriceChart;
