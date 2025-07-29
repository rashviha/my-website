import { useState } from "react";
import { Settings, Share, MoreHorizontal, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock user data
const mockUser = {
  username: "dancemaster",
  displayName: "Dance Master ✨",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b494?w=150&h=150&fit=crop&crop=face",
  verified: true,
  followers: 125000,
  following: 450,
  likes: 2500000,
  bio: "Professional dancer 💃 | Choreographer ✨ | Teaching you viral moves daily! 🔥",
  videos: [
    { id: 1, thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop", views: "2.1M", duration: "0:15" },
    { id: 2, thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=400&fit=crop", views: "1.8M", duration: "0:22" },
    { id: 3, thumbnail: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=400&fit=crop", views: "3.2M", duration: "0:18" },
    { id: 4, thumbnail: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=400&fit=crop", views: "876K", duration: "0:25" },
    { id: 5, thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop", views: "1.2M", duration: "0:30" },
    { id: 6, thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=400&fit=crop", views: "945K", duration: "0:12" },
  ]
};

export default function UserProfile() {
  const [isFollowing, setIsFollowing] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold">{mockUser.username}</span>
          {mockUser.verified && (
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              ✓
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Share className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6 space-y-6">
        {/* Avatar and Stats */}
        <div className="flex items-start space-x-6">
          <Avatar className="w-24 h-24 border-4 border-primary shadow-glow-primary">
            <AvatarImage src={mockUser.avatar} alt={mockUser.username} />
            <AvatarFallback>{mockUser.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-xl font-bold">{formatNumber(mockUser.followers)}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{formatNumber(mockUser.following)}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{formatNumber(mockUser.likes)}</div>
                <div className="text-sm text-muted-foreground">Likes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <h2 className="text-lg font-semibold mb-2">{mockUser.displayName}</h2>
          <p className="text-foreground leading-relaxed">{mockUser.bio}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            className={`flex-1 transition-all duration-200 ${
              isFollowing
                ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                : 'bg-video-gradient text-white hover:scale-105 shadow-glow-primary'
            }`}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
          <Button variant="outline" className="px-6">
            Message
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="videos" className="px-4">
        <TabsList className="grid w-full grid-cols-2 bg-muted">
          <TabsTrigger value="videos" className="font-medium">Videos</TabsTrigger>
          <TabsTrigger value="liked" className="font-medium">Liked</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-4">
          <div className="grid grid-cols-3 gap-1">
            {mockUser.videos.map((video) => (
              <div key={video.id} className="relative aspect-[3/4] group cursor-pointer">
                <img
                  src={video.thumbnail}
                  alt={`Video ${video.id}`}
                  className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors rounded-lg" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play className="w-6 h-6 text-white fill-current ml-1" />
                  </div>
                </div>

                {/* View count */}
                <div className="absolute bottom-2 left-2 flex items-center space-x-1 text-white text-xs">
                  <Play className="w-3 h-3 fill-current" />
                  <span className="font-medium">{video.views}</span>
                </div>

                {/* Duration */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liked" className="mt-4">
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-lg mb-2">No liked videos yet</div>
            <div className="text-sm">Videos you like will appear here</div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}