import { useState } from "react";
import { Home, Search, Plus, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BottomNavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNavigation({ currentTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'create', icon: Plus, label: 'Create', special: true },
    { id: 'inbox', icon: MessageSquare, label: 'Inbox' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-card border-t border-border backdrop-blur-lg bg-background/80">
        <div className="flex items-center justify-around py-2">
          {tabs.map(({ id, icon: Icon, label, special }) => (
            <Button
              key={id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center space-y-1 px-3 py-2 transition-all duration-200 ${
                special
                  ? 'bg-video-gradient text-white hover:scale-105 rounded-2xl px-4 shadow-glow-primary'
                  : currentTab === id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => onTabChange(id)}
            >
              <Icon className={`w-6 h-6 ${special ? 'w-7 h-7' : currentTab === id ? 'animate-bounce-subtle' : ''}`} />
              <span className={`text-xs ${special ? 'text-xs font-medium' : ''}`}>
                {label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}