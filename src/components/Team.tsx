
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Twitter, Globe, ExternalLink, MessageCircle } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Night Owl",
      role: "Lead Investigator",
      image: "/placeholder.svg",
      telegram: "https://t.me/@perturpe",
      website: "#",
      description: "Always vigilant, keeping the community informed and engaged 24/7."
    },
    {
      name: "Chris Vegan",
      role: "Development Specialist",
      image: "/placeholder.svg",
      telegram: "https://t.me/ChrisVegan",
      website: "#",
      description: "Works from the shadows to build secure, Anti-scam smart contracts."
    },
    {
      name: "The Shadow",
      role: "Community Manager",
      image: "/placeholder.svg",
      telegram: "#",
      website: "#",
      description: "Spreading the word about Crime Ceason's mission across the crypto underworld."
    },
    {
      name: "The Informant",
      role: "Marketing Strategist",
      image: "/placeholder.svg",
      telegram: "#",
      website: "#",
      description: "Uncovering crypto crimes since 2020, specializing in tracking rugpull patterns."
    }
    // Space for Dirty Jeeto team members will be added here
  ];

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 shadow-detective hover:bg-white/10 transition-all duration-300 group">
            <CardContent className="p-6 text-center">
              <div className="mb-4 relative mx-auto w-32 h-32 overflow-hidden rounded-full border-2 border-white/20 group-hover:border-white/50 transition-all duration-300">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
              </div>
              
              <h3 className="text-xl font-bold mb-1 group-hover:text-gradient transition-all duration-300">
                {member.name}
              </h3>
              <p className="text-white/70 text-sm mb-3">{member.role}</p>
              
              <p className="text-white/60 text-sm mb-4 italic">
                "{member.description}"
              </p>
              
              <div className="flex justify-center space-x-3">
                <a 
                  href={member.telegram} 
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={`${member.name}'s Telegram`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
                <a 
                  href={member.website} 
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={`${member.name}'s Website`}
                >
                  <Globe className="h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <div className="border-t border-white/10 w-32 mx-auto mb-10"></div>
        <p className="text-xl italic text-white/70 mb-6">
          In collaboration with
        </p>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg inline-block p-6 shadow-2xl hover:bg-white/10 transition-all duration-300">
          <a 
            href="https://linktr.ee/DirtyJeetos" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
          >
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
              <span className="text-xl font-black">DJ</span>
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold group-hover:text-gradient transition-all duration-300">Dirty Jeeto</h3>
              <p className="text-white/70 text-sm">The OG Investigation Partner</p>
            </div>
            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Team;
