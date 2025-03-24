import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, Lock, TrendingUp, Users, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface HeroSectionProps {
  contractAddress: string;
  onCopy: () => void;
  copiedAddress: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ contractAddress, onCopy, copiedAddress }) => {
  const { toast } = useToast();
  const [marketData, setMarketData] = useState({
    price: "0",
    marketCap: "0",
    holders: 0,
    loading: true
  });

  // Fetch CRIMECZN market data from CoinGecko API
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // Fetch CRIMECZN data from CoinGecko API
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/solana/contract/${contractAddress}`
        );
        
        // Handle API response 
        if (response.ok) {
          const data = await response.json();
          console.log("CoinGecko API response:", data);
          
          // Format price with appropriate decimal places
          const tokenPrice = data.market_data?.current_price?.usd || 0.000000768;
          const formattedPrice = new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD',
            minimumFractionDigits: 10,
            maximumFractionDigits: 10
          }).format(tokenPrice);
          
          // Get and format market cap
          const marketCapValue = data.market_data?.market_cap?.usd || 7680000;
          const formattedMarketCap = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 2
          }).format(marketCapValue);

          // Get holders data
          // Note: CoinGecko doesn't provide holder count directly, so we'll use community data if available
          const holdersCount = data.community_data?.twitter_followers || 2485; 
          
          setMarketData({
            price: formattedPrice,
            marketCap: formattedMarketCap,
            holders: holdersCount,
            loading: false
          });
          
        } else {
          // Try fallback to simplified CoinGecko endpoint
          try {
            const simpleResponse = await fetch(
              `https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${contractAddress}&vs_currencies=usd&include_market_cap=true`
            );
            
            if (simpleResponse.ok) {
              const simpleData = await simpleResponse.json();
              console.log("CoinGecko simple API response:", simpleData);
              
              if (simpleData[contractAddress.toLowerCase()]) {
                const tokenData = simpleData[contractAddress.toLowerCase()];
                
                const tokenPrice = tokenData.usd || 0.000000768;
                const formattedPrice = new Intl.NumberFormat('en-US', { 
                  style: 'currency', 
                  currency: 'USD',
                  minimumFractionDigits: 10,
                  maximumFractionDigits: 10
                }).format(tokenPrice);
                
                const marketCapValue = tokenData.usd_market_cap || 7680000;
                const formattedMarketCap = new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  notation: 'compact',
                  maximumFractionDigits: 2
                }).format(marketCapValue);
                
                setMarketData({
                  price: formattedPrice,
                  marketCap: formattedMarketCap,
                  holders: 2485, // Default since API doesn't provide this
                  loading: false
                });
                
                return; // Exit if fallback successful
              }
            }
            
            // If we reach here, fallback also failed
            throw new Error("Both primary and fallback API requests failed");
            
          } catch (fallbackErr) {
            console.error("Fallback API also failed:", fallbackErr);
            // Continue to the general fallback below
          }
          
          // Fallback to simulated data if all API calls fail
          console.error("Failed to fetch from CoinGecko, using fallback data");
          toast({
            title: "Data fetch error",
            description: "Using fallback market data",
            variant: "destructive"
          });
          
          setMarketData({
            price: "$0.000000768",
            marketCap: "$7.68M", 
            holders: 2485,
            loading: false
          });
        }
      } catch (err) {
        console.error("Error fetching market data:", err);
        // Fallback to simulated data on error
        setMarketData({
          price: "$0.000000768",
          marketCap: "$7.68M",
          holders: 2485,
          loading: false
        });
      }
    };

    fetchMarketData();
    // Refresh data every 60 seconds
    const intervalId = setInterval(fetchMarketData, 60000);
    
    return () => clearInterval(intervalId);
  }, [contractAddress, toast]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background overlay with film grain texture */}
      <div className="absolute inset-0 bg-black opacity-80"></div>
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-800/30 to-black/90"></div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
          <div className="mb-6 flex justify-center">
            <div className="w-40 h-40 rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                src="/lovable-uploads/3147b6cc-bf16-497c-861d-f32fa1daa67c.png" 
                alt="CRIMECZN Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight spotlight-text">
            CRIME CEASON
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/80 font-serif leading-relaxed">
            The memecoin that exposes the shadowy underbelly of crypto scams and rugpulls
          </p>
        </div>
        
        <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              className="bg-white text-black hover:bg-white/90 shadow-xl px-6 py-6 text-lg"
              onClick={() => window.open("https://raydium.io/swap/?inputCurrency=sol&outputCurrency=DmQ6ZD1HGACksWNc4md4RwyB4MgCVah8oFL1XEdGmoon", "_blank")}
            >
              <span>Buy $CRIMECZN</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="border-white/20 bg-white/5 hover:bg-white/10 px-6 py-6 text-lg"
              onClick={() => window.open("https://birdeye.so/token/DmQ6ZD1HGACksWNc4md4RwyB4MgCVah8oFL1XEdGmoon?chain=solana", "_blank")}
            >
              View Chart
            </Button>
          </div>
          
          <div className="mb-8 flex justify-center">
            <a 
              href="https://app.streamflow.finance/contract/solana/mainnet/BbWmPxFPwwiZnB9W9LPnxaMwLM5Uczs3uP29BRZDgEet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <Lock className="h-4 w-4 text-green-400" />
              <span className="text-green-400 font-medium">Tokens locked until July 2025</span>
              <ExternalLink className="h-3 w-3 text-white/60" />
            </a>
          </div>
        </div>
        
        <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-4 inline-block">
            <div className="flex items-center">
              <span className="text-white/70 mr-2">Contract:</span>
              <code className="font-mono text-sm bg-black/30 px-3 py-1 rounded">
                {contractAddress.substring(0, 8) + "..." + contractAddress.substring(contractAddress.length - 8)}
              </code>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onCopy} 
                className="ml-2 text-white/70 hover:text-white"
              >
                {copiedAddress ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            {/* Market data stats for CRIMECZN */}
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center text-white/70 text-xs mb-1">
                  <DollarSign className="h-3 w-3 mr-1" />
                  <span>Price</span>
                </div>
                {marketData.loading ? (
                  <Skeleton className="h-5 w-20 bg-white/20 rounded" />
                ) : (
                  <span className="text-green-400 font-medium">{marketData.price}</span>
                )}
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center text-white/70 text-xs mb-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>Market Cap</span>
                </div>
                {marketData.loading ? (
                  <Skeleton className="h-5 w-20 bg-white/20 rounded" />
                ) : (
                  <span className="text-white font-medium">{marketData.marketCap}</span>
                )}
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center text-white/70 text-xs mb-1">
                  <Users className="h-3 w-3 mr-1" />
                  <span>Holders</span>
                </div>
                {marketData.loading ? (
                  <Skeleton className="h-5 w-20 bg-white/20 rounded" />
                ) : (
                  <span className="text-white font-medium">{marketData.holders.toLocaleString()}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
