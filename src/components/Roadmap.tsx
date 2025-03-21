
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Roadmap = () => {
  const phases = [
    {
      title: "Phase 1: The Crime Scene",
      status: "completed",
      items: [
        "Project inception & concept development",
        "Website launch with Film Noir aesthetic",
        "Community building on social platforms",
        "Smart contract deployment"
      ]
    },
    {
      title: "Phase 2: The Investigation",
      status: "in-progress",
      items: [
        "Exchange listings (DEX focus)",
        "PR & marketing campaigns",
        "Community competitions & rewards",
        "Collaboration with Dirty Jeeto",
        "Initial CEX listing"
      ]
    },
    {
      title: "Phase 3: Cold Case Files",
      status: "upcoming",
      items: [
        "Launch of interactive dApp for tracking scams",
        "Development of scam detection tools",
        "Major CEX listings",
        "Cross-chain expansion",
        "Expanded meme creation platform"
      ]
    },
    {
      title: "Phase 4: Justice Served",
      status: "planned",
      items: [
        "Full-scale analytics platform for tracking suspicious crypto activity",
        "Educational content series about avoiding scams",
        "Charity partnerships to assist scam victims",
        "DAO governance implementation",
        "Worldwide anti-scam campaign"
      ]
    }
  ];

  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/50 via-white/30 to-white/5 transform -translate-x-1/2 hidden lg:block"></div>
      
      <div className="space-y-16 relative">
        {phases.map((phase, index) => (
          <div key={index} className="group">
            <div className={`flex flex-col lg:flex-row gap-8 items-center lg:items-start ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Phase number indicator */}
              <div className="relative lg:w-1/2 flex justify-center lg:justify-end items-center">
                <div className="w-12 h-12 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 shadow-xl flex items-center justify-center z-10 text-xl font-bold">
                  {index + 1}
                </div>
                {/* Horizontal line for mobile */}
                <div className="absolute top-1/2 w-full h-0.5 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -translate-y-1/2 lg:hidden"></div>
              </div>
              
              {/* Content */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all duration-300">
                  {phase.title}
                </h3>
                <Badge className={`mb-4 ${getStatusClass(phase.status)}`}>
                  {formatStatus(phase.status)}
                </Badge>
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-detective group-hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <ul className="space-y-3 text-white/80">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/50 mt-2 mr-2"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper functions
const getStatusClass = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500/20 text-green-400 hover:bg-green-500/30";
    case "in-progress":
      return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
    case "upcoming":
      return "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30";
  }
};

const formatStatus = (status: string) => {
  switch (status) {
    case "completed":
      return "Completed";
    case "in-progress":
      return "In Progress";
    case "upcoming":
      return "Upcoming";
    case "planned":
      return "Planned";
    default:
      return status;
  }
};

export default Roadmap;
