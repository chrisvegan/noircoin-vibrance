
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PriceChart from "@/components/PriceChart";
import Roadmap from "@/components/Roadmap";
import Team from "@/components/Team";
import MemeSubmission from "@/components/MemeSubmission";
import AntiScamSection from "@/components/AntiScamSection";
import HeroSection from "@/components/HeroSection";
import { ArrowDown, Shield, Banknote, Users, FileImage, ExternalLink } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [copiedAddress, setCopiedAddress] = useState(false);
  
  const contractAddress = "DmQ6ZD1HGACksWNc4md4RwyB4MgCVah8oFL1XEdGmoon";
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopiedAddress(true);
    toast({
      title: "Address Copied",
      description: "Contract address copied to clipboard",
    });
    
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection contractAddress={contractAddress} onCopy={copyToClipboard} copiedAddress={copiedAddress} />
      
      {/* Scroll indicator */}
      <div className="flex justify-center mb-8 animate-bounce">
        <ArrowDown className="h-8 w-8 text-white/50" />
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-24">
        {/* Logo Section */}
        <section id="about" className="py-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight text-center">
              <span className="text-gradient">$CRIMECZN</span> Fighting Crypto Crime
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-2xl">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10"></div>
                  <img 
                    src="/lovable-uploads/b321fa1a-c225-4d74-97d2-0e82a5b14319.png" 
                    alt="Crime Ceason Rugmap" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-left space-y-4">
                <p className="text-lg text-white/90 leading-relaxed">
                  <span className="text-xl font-semibold text-gradient">Crime Ceason ($CRIMECZN)</span> is on a mission to expose scams and rugpulls in the crypto world.
                </p>
                <p className="text-white/70 leading-relaxed">
                  In a space rife with deception, we stand as vigilant detectives investigating the shadows of blockchain.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Join our growing community of crypto sleuths and help us clean up the blockchain underworld.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Price Chart Section */}
        <section id="chart" className="py-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-center">
              <span className="text-gradient">Crypto Market</span> Overview
            </h2>
            <div className="backdrop-blur-sm bg-white/5 rounded-xl border border-white/10 p-4 shadow-2xl">
              <PriceChart />
            </div>
          </div>
        </section>
        
        {/* Anti-Scam Section */}
        <AntiScamSection />
        
        {/* Roadmap Section */}
        <section id="roadmap" className="py-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight text-center">
            The <span className="text-gradient">Investigation</span> Timeline
          </h2>
          <Roadmap />
        </section>
        
        {/* Team Section */}
        <section id="team" className="py-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight text-center">
            The <span className="text-gradient">Detectives</span>
          </h2>
          <Team />
          <div className="mt-12 text-center">
            <p className="text-xl italic text-white/70 mb-4">
              In collaboration with Dirty Jeeto
            </p>
            <Button variant="outline" className="group bg-white/5 hover:bg-white/10">
              <span>Dirty Jeeto</span>
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>
        
        {/* Meme Submission Section */}
        <section id="memes" className="py-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight text-center">
            Submit Your <span className="text-gradient">Evidence</span>
          </h2>
          <div className="max-w-2xl mx-auto">
            <MemeSubmission />
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-lg border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4">$CRIMECZN</h3>
              <p className="text-white/70">
                Exposing crypto scams one token at a time.
                Join the fight against rugpulls and scammers.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-white/70 hover:text-white transition-colors">About</a></li>
                <li><a href="#chart" className="text-white/70 hover:text-white transition-colors">Chart</a></li>
                <li><a href="#roadmap" className="text-white/70 hover:text-white transition-colors">Roadmap</a></li>
                <li><a href="#team" className="text-white/70 hover:text-white transition-colors">Team</a></li>
                <li><a href="#memes" className="text-white/70 hover:text-white transition-colors">Meme Submission</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <div className="flex space-x-4">
                <a href="https://t.me/crimeczn" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full" aria-label="Telegram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.82 9.242a2.446 2.446 0 0 0-1.67-1.518c-1.196-.379-2.415-.575-3.648-.577-1.297-.013-6.547-.013-6.547-.013s-4.673-.01-6.01.034c-1.253.034-2.462.266-3.514.677A2.36 2.36 0 0 0 .1 9.021 24.93 24.93 0 0 0 .064 12c-.013 1.024.026 2.048.115 3.07.056.606.343 1.175.792 1.573.45.398 1.034.658 1.653.732 1.223.303 2.47.453 3.726.446 1.684.017 3.368-.025 5.05-.124l.294-.023c1.257-.11 2.48-.559 3.635-1.128.561-.277.969-.754 1.137-1.324.43-1.265.65-2.586.65-3.917-.006-1.009-.052-1.955-.232-2.92Z"/><path d="m9.602 14.682 4.173-2.401-4.173-2.402v4.803Z"/></svg>
                </a>
                <a href="https://x.com/CrimeCznCto" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full" aria-label="X (Twitter)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z"></path></svg>
                </a>
                <a href="https://instagram.com/crimeczn" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-full" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/50 text-sm">
            <p>© 2025 Crime Ceason ($CRIMECZN). All rights reserved.</p>
            <p className="mt-1">This website is for entertainment purposes only. Not financial advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

