
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  contractAddress: string;
  onCopy: () => void;
  copiedAddress: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ contractAddress, onCopy, copiedAddress }) => {
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
            <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden flex items-center justify-center">
              <span className="text-4xl font-black text-gradient">C</span>
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
            <Button className="bg-white text-black hover:bg-white/90 shadow-xl px-6 py-6 text-lg">
              <span>Buy $CRIMECZN</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 px-6 py-6 text-lg">
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
              <span className="text-green-400 font-medium">Tokens locked until July 2024</span>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
