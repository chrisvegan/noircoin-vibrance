
import React, { useState, useEffect } from "react";
import {
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Treemap,
  Cell
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, TrendingUp, TrendingDown } from "lucide-react";

const chartConfig = {
  price: {
    label: "Price",
    color: "#ffffff",
  },
  volume: {
    label: "Volume",
    color: "#ffffff",
  },
};

// Color scale for the bubble chart
const COLORS = [
  "#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c",
  "#d0ed57", "#ffc658", "#ff8042", "#ff5252", "#e74c3c"
];

const PriceChart = () => {
  const isMobile = useIsMobile();
  const [chartType, setChartType] = useState("price");
  const [cryptoData, setCryptoData] = useState([]);
  const [bubbleData, setBubbleData] = useState([]);
  const [marketStats, setMarketStats] = useState({
    btcPrice: 0,
    btcMarketCap: 0,
    btcVolume: 0,
    btcChange24h: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  // Fetch price history data from CoinGecko
  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=daily",
          { 
            headers: { 
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            } 
          }
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        
        const data = await response.json();
        
        // Format price data for the chart
        const formattedData = data.prices.map((item, index) => {
          const date = new Date(item[0]);
          return {
            date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            price: item[1],
            volume: data.total_volumes[index]?.[1] || 0
          };
        });
        
        setCryptoData(formattedData);
        
        // Set the latest BTC stats for the cards
        if (formattedData.length > 0) {
          const latestDay = formattedData[formattedData.length - 1];
          const previousDay = formattedData[formattedData.length - 2] || formattedData[0];
          
          const priceChange = ((latestDay.price - previousDay.price) / previousDay.price) * 100;
          
          setMarketStats({
            btcPrice: latestDay.price,
            btcMarketCap: data.market_caps[data.market_caps.length - 1]?.[1] || 0,
            btcVolume: latestDay.volume,
            btcChange24h: priceChange,
          });
          
          // Set last updated time
          setLastUpdated(new Date().toLocaleString());
        }
      } catch (err) {
        console.error("Error fetching price data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch market data for bubble chart
    const fetchMarketData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=24h",
          { 
            headers: { 
              'Accept': 'application/json',
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            } 
          }
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch market data");
        }
        
        const data = await response.json();
        
        // Format data for bubble chart
        const bubbleData = data.map(coin => ({
          name: coin.symbol.toUpperCase(),
          marketCap: coin.market_cap,
          volume: coin.total_volume,
          priceChange: coin.price_change_percentage_24h || 0,
          price: coin.current_price,
          value: coin.market_cap // For treemap size
        }));
        
        setBubbleData(bubbleData);
      } catch (err) {
        console.error("Error fetching market data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPriceData();
    fetchMarketData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(() => {
      fetchPriceData();
      fetchMarketData();
    }, 300000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white/50" />
        <span className="ml-2 text-white/70">Loading chart data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <p className="text-red-400">Error loading chart data: {error}</p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <Tabs defaultValue="price" onValueChange={setChartType} className="w-full">
        <TabsList className="mx-auto mb-4 bg-white/10">
          <TabsTrigger value="price">BTC Price</TabsTrigger>
          <TabsTrigger value="bubble">Market Map</TabsTrigger>
          <TabsTrigger value="volume">BTC Trading Volume</TabsTrigger>
        </TabsList>
        
        <TabsContent value="price" className="h-[400px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <AreaChart data={cryptoData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#9ca3af' }}
                tickMargin={10}
                tickCount={isMobile ? 5 : 10}
              />
              <YAxis 
                tickFormatter={(value) => `$${Math.round(value).toLocaleString()}`}
                tick={{ fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                domain={['dataMin', 'dataMax']}
                tickMargin={10}
                width={70}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <ChartTooltip
                content={
                  <ChartTooltipContent 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "BTC Price"]} 
                  />
                }
              />
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="#FFFFFF" 
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </TabsContent>
        
        <TabsContent value="bubble" className="h-[400px]">
          {bubbleData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={bubbleData}
                dataKey="value"
                nameKey="name"
                stroke="#fff"
                aspectRatio={4 / 3}
              >
                {
                  bubbleData.map((entry, index) => {
                    const colorIndex = index % COLORS.length;
                    const isPriceUp = entry.priceChange >= 0;
                    
                    return (
                      <Cell 
                        key={`cell-${index}`}
                        fill={isPriceUp ? '#22c55e' : '#ef4444'} 
                        fillOpacity={0.7 + (Math.abs(entry.priceChange) / 100)}
                      />
                    )
                  })
                }
              </Treemap>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white/50">No market data available</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="volume" className="h-[400px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <AreaChart data={cryptoData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#9ca3af' }}
                tickMargin={10}
                tickCount={isMobile ? 4 : 8}
              />
              <YAxis 
                dataKey="volume"
                tickFormatter={(value) => `$${(value/1000000000).toFixed(1)}B`}
                tick={{ fill: '#9ca3af' }}
                tickLine={false}
                axisLine={false}
                domain={['dataMin', 'dataMax']}
                tickMargin={10}
                width={70}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <ChartTooltip
                content={
                  <ChartTooltipContent 
                    formatter={(value) => [`$${(Number(value)/1000000000).toFixed(2)}B`, "BTC Volume"]} 
                  />
                }
              />
              <Area 
                type="monotone" 
                dataKey="volume" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorVolume)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              Bitcoin Price
            </CardTitle>
            <CardDescription>
              Current value of BTC
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${marketStats.btcPrice.toLocaleString()}</p>
            <div className="flex items-center mt-1">
              {marketStats.btcChange24h >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
              )}
              <p className={`text-sm ${marketStats.btcChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {marketStats.btcChange24h.toFixed(2)}% (24h)
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              Market Cap
            </CardTitle>
            <CardDescription>
              BTC's total market value
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${(marketStats.btcMarketCap / 1000000000).toFixed(1)}B</p>
            <p className="text-sm text-white/60 mt-1">
              {(marketStats.btcMarketCap / 1000000000000).toFixed(2)}T USD total value
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              24h Volume
            </CardTitle>
            <CardDescription>
              Trading activity last 24h
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${(marketStats.btcVolume / 1000000000).toFixed(1)}B</p>
            <p className="text-sm text-white/60 mt-1">
              {((marketStats.btcVolume / marketStats.btcMarketCap) * 100).toFixed(1)}% of market cap
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-4 text-center text-xs text-white/50">
        <p>Data source: CoinGecko API | Last updated: {lastUpdated}</p>
      </div>
    </div>
  );
};

export default PriceChart;
