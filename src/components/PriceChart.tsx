
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ScatterChart, Scatter, ZAxis, Bubble } from 'recharts';
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

// Data for bubble chart (market cap visualization)
const bubbleData = [
  { name: 'BTC', value: 760000000000, volume: 40000000000, marketShare: 45 },
  { name: 'ETH', value: 220000000000, volume: 20000000000, marketShare: 18 },
  { name: 'BNB', value: 37000000000, volume: 2000000000, marketShare: 4 },
  { name: 'SOL', value: 32000000000, volume: 5000000000, marketShare: 3 },
  { name: 'XRP', value: 25000000000, volume: 1500000000, marketShare: 2.5 },
  { name: 'ADA', value: 11000000000, volume: 800000000, marketShare: 1.2 },
  { name: 'DOGE', value: 10000000000, volume: 700000000, marketShare: 1 },
  { name: 'AVAX', value: 8000000000, volume: 600000000, marketShare: 0.8 },
  { name: 'MATIC', value: 5000000000, volume: 400000000, marketShare: 0.6 },
  { name: 'CRIMECZN', value: 7680000, volume: 500000, marketShare: 0.001 },
];

// Mock data for volume chart
const volumeData = [
  { date: '2024-01-01', volume: 25000000000 },
  { date: '2024-01-02', volume: 28000000000 },
  { date: '2024-01-03', volume: 30000000000 },
  { date: '2024-01-04', volume: 27000000000 },
  { date: '2024-01-05', volume: 32000000000 },
  { date: '2024-01-06', volume: 35000000000 },
  { date: '2024-01-07', volume: 38000000000 },
  { date: '2024-01-08', volume: 40000000000 },
  { date: '2024-01-09', volume: 42000000000 },
  { date: '2024-01-10', volume: 45000000000 },
];

// CustomTooltip for the price chart
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

// Bubble chart tooltip
const BubbleTooltip = ({ active, payload }: {
  active?: boolean;
  payload?: Array<any>;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip bg-black/90 p-4 rounded-lg border border-white/20 shadow-xl backdrop-blur-sm">
        <p className="font-bold text-lg text-blue-400">{data.name}</p>
        <p className="text-sm text-white/70">
          Market Cap: <span className="text-white">${(data.value / 1000000000).toFixed(2)}B</span>
        </p>
        <p className="text-sm text-white/70">
          Volume: <span className="text-white">${(data.volume / 1000000000).toFixed(2)}B</span>
        </p>
        <p className="text-sm text-white/70">
          Market Share: <span className="text-white">{data.marketShare}%</span>
        </p>
      </div>
    );
  }
  return null;
};

// Volume chart tooltip
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
        <p className="font-bold text-orange-400">${(data.volume / 1000000000).toFixed(2)}B</p>
        <p className="text-sm text-white/70 mt-1">
          24h Trading Volume for <span className="text-yellow-500">Bitcoin</span>
        </p>
      </div>
    );
  }
  return null;
};

const PriceChart = () => {
  
  return (
    <div className="text-white">
      <Tabs defaultValue="chart">
        <TabsList className="w-full max-w-md mx-auto mb-6 bg-white/5">
          <TabsTrigger value="chart" className="flex-1">BTC Price</TabsTrigger>
          <TabsTrigger value="bubble" className="flex-1">Market Map</TabsTrigger>
          <TabsTrigger value="volume" className="flex-1">BTC Volume</TabsTrigger>
        </TabsList>
        
        {/* BTC Price Chart */}
        <TabsContent value="chart">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#fff" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis stroke="#fff" tickFormatter={(price) => `$${(price/1000)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#22c55e" strokeWidth={2} dot={false} name="Price" />
              <Line type="monotone" dataKey="high" stroke="#3b82f6" strokeWidth={1} dot={false} name="High" />
              <Line type="monotone" dataKey="low" stroke="#ef4444" strokeWidth={1} dot={false} name="Low" />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        {/* Market Map Bubble Chart */}
        <TabsContent value="bubble">
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis 
                type="category" 
                dataKey="name" 
                name="Coin" 
                stroke="#fff" 
              />
              <YAxis 
                type="number" 
                dataKey="marketShare" 
                name="Market Share" 
                stroke="#fff"
                label={{ value: 'Market Share %', angle: -90, position: 'insideLeft', fill: '#fff' }}
              />
              <ZAxis 
                type="number" 
                dataKey="value" 
                range={[50, 500]} 
                name="Market Cap"
              />
              <Tooltip content={<BubbleTooltip />} />
              <Scatter 
                name="Market Cap" 
                data={bubbleData} 
                fill="#8884d8" 
                fillOpacity={0.6}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </TabsContent>
        
        {/* BTC Volume Chart */}
        <TabsContent value="volume">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#fff" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis 
                stroke="#fff" 
                tickFormatter={(volume) => `$${(volume / 1000000000).toFixed(0)}B`} 
              />
              <Tooltip content={<VolumeTooltip />} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="volume" 
                stroke="#f97316" 
                fill="url(#colorVolume)" 
                name="Volume" 
              />
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PriceChart;
