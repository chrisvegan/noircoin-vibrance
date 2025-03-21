
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Lock, Eye } from "lucide-react";

const AntiScamSection = () => {
  const scamTypes = [
    {
      title: "Rugpulls",
      icon: <AlertTriangle className="h-8 w-8 text-red-400" />,
      description: "Developers abandon a project and run away with investor funds by withdrawing liquidity from trading pools."
    },
    {
      title: "Honeypots",
      icon: <Lock className="h-8 w-8 text-amber-400" />,
      description: "Contracts designed to prevent investors from selling their tokens, trapping their funds permanently."
    },
    {
      title: "Pump & Dumps",
      icon: <Eye className="h-8 w-8 text-blue-400" />,
      description: "Projects artificially inflate their price and market cap, then sell their holdings once investors buy in."
    },
    {
      title: "Fake Teams",
      icon: <Shield className="h-8 w-8 text-green-400" />,
      description: "False identities and credentials used to create artificial trust before disappearing with funds."
    }
  ];

  return (
    <section id="anti-scam" className="py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-center">
          Exposing <span className="text-gradient">Crypto Crimes</span>
        </h2>
        <p className="text-xl text-white/70 text-center mb-12 max-w-3xl mx-auto">
          Crime Ceason is on a mission to shine a light on the shadowy practices that plague the crypto world.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scamTypes.map((scam, index) => (
            <Card 
              key={index} 
              className="bg-white/5 backdrop-blur-sm border-white/10 shadow-detective hover:bg-white/10 transition-all duration-300 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-black/30">
                    {scam.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-gradient transition-all duration-300">
                    {scam.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-white/70">{scam.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-b from-red-950/30 to-black/80 backdrop-blur-sm border-white/5 shadow-xl overflow-hidden p-8">
            <h3 className="text-2xl font-bold mb-4">
              $CRIMECZN is Different
            </h3>
            <p className="text-lg text-white/80 mb-6">
              Our contract is fully audited and renounced, with locked liquidity.
              We're here to stay and fight against scams, not create another one.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/10 rounded-lg px-4 py-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>Audited Contract</span>
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-3 flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-400" />
                <span>Locked Liquidity</span>
              </div>
              <div className="bg-white/10 rounded-lg px-4 py-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-green-400" />
                <span>No Hidden Fees</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AntiScamSection;
