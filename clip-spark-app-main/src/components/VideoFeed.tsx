import { useState } from "react";
import { Heart, MessageCircle, Share, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock video data
const mockVideos = [
  {
    id: 1,
    username: "dancemaster",
    displayName: "Dance Master ✨",
    description: "New dance trend! Who can do this? 💃 #dance #viral #fyp",
    likes: 12500,
    comments: 892,
    shares: 234,
    music: "Original Sound - dancemaster",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b494?w=150&h=150&fit=crop&crop=face",
    verified: true
  },
  {
    id: 2,
    username: "foodiegram",
    displayName: "Foodie Gram",
    description: "60-second carbonara that'll change your life 🍝✨ #cooking #pasta #recipe",
    likes: 8934,
    comments: 445,
    shares: 167,
    music: "Cooking Vibes - Foodie",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    verified: false
  },
  {
    id: 3,
    username: "techreview",
    displayName: "Tech Reviews",
    description: "iPhone 15 Pro Max review in 60 seconds! 📱⚡ #tech #apple #review",
    likes: 15600,
    comments: 1200,
    shares: 890,
    music: "Tech Beat - Electronic",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    verified: true
  }
];

export default function VideoFeed() {
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set());

  const handleLike = (videoId: number) => {
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  return (
    <div className="h-screen overflow-y-auto snap-y snap-mandatory bg-background">
      {mockVideos.map((video) => (
        <div key={video.id} className="relative h-screen w-full snap-start">
          {/* Video Background (Mock) */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-blue-900/30">
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Video Content Overlay */}
          <div className="absolute inset-0 flex">
            {/* Main content area - takes most of the screen */}
            <div className="flex-1" />
            
            {/* Right sidebar with actions */}
            <div className="w-16 flex flex-col justify-end items-center pb-24 space-y-6">
              {/* User Avatar */}
              <div className="relative">
                <Avatar className="w-14 h-14 border-2 border-white shadow-glow-primary">
                  <AvatarImage src={video.avatar} alt={video.username} />
                  <AvatarFallback>{video.username[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-2 border-background p-0 hover:scale-110 transition-transform"
                >
                  +
                </Button>
              </div>

              {/* Like Button */}
              <div className="flex flex-col items-center space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-12 h-12 rounded-full p-0 transition-all duration-200 ${
                    likedVideos.has(video.id)
                      ? 'bg-like-gradient text-white animate-bounce-subtle shadow-glow-primary'
                      : 'bg-black/30 text-white hover:bg-black/50'
                  }`}
                  onClick={() => handleLike(video.id)}
                >
                  <Heart className={`w-6 h-6 ${likedVideos.has(video.id) ? 'fill-current' : ''}`} />
                </Button>
                <span className="text-white text-xs font-medium">
                  {(video.likes + (likedVideos.has(video.id) ? 1 : 0)).toLocaleString()}
                </span>
              </div>

              {/* Comment Button */}
              <div className="flex flex-col items-center space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-12 h-12 rounded-full p-0 bg-black/30 text-white hover:bg-black/50 transition-colors"
                >
                  <MessageCircle className="w-6 h-6" />
                </Button>
                <span className="text-white text-xs font-medium">{video.comments}</span>
              </div>

              {/* Share Button */}
              <div className="flex flex-col items-center space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-12 h-12 rounded-full p-0 bg-black/30 text-white hover:bg-black/50 transition-colors"
                >
                  <Share className="w-6 h-6" />
                </Button>
                <span className="text-white text-xs font-medium">{video.shares}</span>
              </div>

              {/* Music Note */}
              <Button
                variant="ghost"
                size="sm"
                className="w-12 h-12 rounded-full p-0 bg-black/30 text-white hover:bg-black/50 transition-colors animate-pulse-glow"
              >
                <Music className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-16 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="space-y-3">
              {/* User Info */}
              <div className="flex items-center space-x-2">
                <span className="text-white font-semibold text-lg">@{video.username}</span>
                {video.verified && (
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    ✓
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-white text-sm leading-relaxed pr-4">
                {video.description}
              </p>

              {/* Music Info */}
              <div className="flex items-center space-x-2 text-white/80">
                <Music className="w-4 h-4" />
                <span className="text-sm truncate">{video.music}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}