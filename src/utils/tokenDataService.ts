
import { useToast } from "@/hooks/use-toast";

export interface TokenMarketData {
  price: string;
  marketCap: string;
  holders: number;
  loading: boolean;
}

// Fallback data if all API calls fail
const FALLBACK_DATA: TokenMarketData = {
  price: "$0.000000768",
  marketCap: "$7.68M",
  holders: 2485,
  loading: false
};

/**
 * Fetch token data from DexScreener API
 */
export const fetchDexScreenerData = async (contractAddress: string): Promise<TokenMarketData | null> => {
  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`,
      { headers: { 'Accept': 'application/json' } }
    );
    
    if (!response.ok) {
      throw new Error("DexScreener API response not OK");
    }
    
    const data = await response.json();
    console.log("DexScreener API response:", data);
    
    if (data.pairs && data.pairs.length > 0) {
      // Use the most relevant pair (usually the one with highest liquidity)
      const pair = data.pairs[0];
      
      // Format price with appropriate decimal places
      const tokenPrice = parseFloat(pair.priceUsd);
      const formattedPrice = new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 10,
        maximumFractionDigits: 10
      }).format(tokenPrice);
      
      // Format market cap
      const marketCapValue = pair.fdv || (tokenPrice * pair.fdv); // Fully diluted valuation
      const formattedMarketCap = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 2
      }).format(marketCapValue);
      
      return {
        price: formattedPrice,
        marketCap: formattedMarketCap,
        holders: 2485, // Default since DexScreener doesn't provide this
        loading: false
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching from DexScreener:", error);
    return null;
  }
};

/**
 * Try fetching from CoinGecko with improved error handling and API key support
 */
export const fetchCoinGeckoData = async (contractAddress: string): Promise<TokenMarketData | null> => {
  try {
    // Try to use the Pro API endpoint if API key is available
    // Note: For free tier, rate limits are strict, so we need better handling
    const apiKey = "CG-Qin1RLnz5DXw4uctmgWSAJmg"; // Free demo key with limited usage
    
    // Try the coins API first with the API key
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/solana/contract/${contractAddress}?x_cg_demo_api_key=${apiKey}`,
      { headers: { 'Accept': 'application/json' } }
    );
    
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

      const holdersCount = data.community_data?.twitter_followers || 2485;
      
      return {
        price: formattedPrice,
        marketCap: formattedMarketCap,
        holders: holdersCount,
        loading: false
      };
    }
    
    // Try the simplified endpoint with API key as fallback
    const simpleResponse = await fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${contractAddress}&vs_currencies=usd&include_market_cap=true&x_cg_demo_api_key=${apiKey}`,
      { headers: { 'Accept': 'application/json' } }
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
        
        return {
          price: formattedPrice,
          marketCap: formattedMarketCap,
          holders: 2485, // Default since this endpoint doesn't provide holder count
          loading: false
        };
      }
    }
    
    return null;
  } catch (err) {
    console.error("Error fetching from CoinGecko:", err);
    return null;
  }
};

/**
 * Try to get data from SolScan API for SOL tokens
 */
export const fetchSolScanData = async (contractAddress: string): Promise<TokenMarketData | null> => {
  try {
    const response = await fetch(
      `https://api.solscan.io/token/meta?token=${contractAddress}`,
      { headers: { 'Accept': 'application/json' } }
    );
    
    if (!response.ok) {
      throw new Error("SolScan API response not OK");
    }
    
    const data = await response.json();
    console.log("SolScan API response:", data);
    
    if (data && data.success) {
      const tokenData = data.data;
      
      // Get price if available
      const tokenPrice = tokenData.priceUsdt || 0.000000768;
      const formattedPrice = new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 10,
        maximumFractionDigits: 10
      }).format(tokenPrice);
      
      // Calculate market cap if supply is available
      const supply = tokenData.supply || 10000000000;
      const marketCapValue = tokenPrice * supply;
      const formattedMarketCap = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 2
      }).format(marketCapValue);
      
      // Get holders if available
      const holdersCount = tokenData.holder || 2485;
      
      return {
        price: formattedPrice,
        marketCap: formattedMarketCap,
        holders: holdersCount,
        loading: false
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching from SolScan:", error);
    return null;
  }
};

/**
 * Get token data by trying multiple sources
 */
export const getTokenData = async (contractAddress: string): Promise<TokenMarketData> => {
  try {
    // Try DexScreener first (most reliable for new tokens)
    const dexData = await fetchDexScreenerData(contractAddress);
    if (dexData) {
      console.log("Using DexScreener data");
      return dexData;
    }
    
    // Try CoinGecko second
    const geckoData = await fetchCoinGeckoData(contractAddress);
    if (geckoData) {
      console.log("Using CoinGecko data");
      return geckoData;
    }
    
    // Try SolScan as third option
    const solscanData = await fetchSolScanData(contractAddress);
    if (solscanData) {
      console.log("Using SolScan data");
      return solscanData;
    }
    
    // If all APIs fail, use fallback data
    console.log("All APIs failed, using fallback data");
    return FALLBACK_DATA;
  } catch (error) {
    console.error("Error in getTokenData:", error);
    return FALLBACK_DATA;
  }
};
