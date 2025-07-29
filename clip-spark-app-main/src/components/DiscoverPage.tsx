import { useState } from "react";
import { Search, TrendingUp, Music, Hash, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock trending data
const trendingHashtags = [
  { tag: "fyp", count: "12.3M", growth: "+15%" },
  { tag: "dance", count: "8.7M", growth: "+22%" },
  { tag: "viral", count: "15.2M", growth: "+8%" },
  { tag: "comedy", count: "6.1M", growth: "+18%" },
  { tag: "food", count: "4.8M", growth: "+12%" },
  { tag: "tech", count: "3.2M", growth: "+25%" },
];

const trendingSounds = [
  { name: "Original Sound - dancemaster", videos: "2.1M", duration: "0:15" },
  { name: "Viral Dance Beat", videos: "1.8M", duration: "0:30" },
  { name: "Comedy Sound Effect", videos: "1.5M", duration: "0:08" },
  { name: "Trending Pop Song", videos: "3.2M", duration: "0:45" },
  { name: "Motivational Speech", videos: "892K", duration: "0:22" },
];

const discoverVideos = [
  { id: 1, thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop", views: "2.1M", hashtag: "dance" },
  { id: 2, thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=400&fit=crop", views: "1.8M", hashtag: "comedy" },
  { id: 3, thumbnail: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&h=400&fit=crop", views: "3.2M", hashtag: "viral" },
  { id: 4, thumbnail: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=400&fit=crop", views: "876K", hashtag: "tech" },
  { id: 5, thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=400&fit=crop", views: "1.2M", hashtag: "food" },
  { id: 6, thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=300&h=400&fit=crop", views: "945K", hashtag: "fyp" },
];

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Search */}
      <div className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="p-4 space-y-4">
          <h1 className="text-2xl font-bold">Discover</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search users, sounds, hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-12 bg-background/50 border-border"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted mb-6">
            <TabsTrigger value="trending" className="font-medium">Trending</TabsTrigger>
            <TabsTrigger value="hashtags" className="font-medium">Hashtags</TabsTrigger>
            <TabsTrigger value="sounds" className="font-medium">Sounds</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-6">
            {/* Trending Now Banner */}
            <div className="bg-video-gradient p-6 rounded-2xl text-white shadow-glow-primary">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-6 h-6" />
                <span className="text-lg font-semibold">Trending Now</span>
              </div>
              <p className="text-white/90 mb-4">
                Check out the hottest videos everyone's talking about! 🔥
              </p>
              <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                View All Trending
              </Button>
            </div>

            {/* Video Grid */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Trending Videos</h3>
              <div className="grid grid-cols-2 gap-3">
                {discoverVideos.map((video) => (
                  <div key={video.id} className="relative aspect-[3/4] group cursor-pointer">
                    <img
                      src={video.thumbnail}
                      alt={`Trending video ${video.id}`}
                      className="w-full h-full object-cover rounded-xl transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors rounded-xl" />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-6 h-6 text-white fill-current ml-1" />
                      </div>
                    </div>

                    {/* View count */}
                    <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-white text-sm">
                      <Play className="w-3 h-3 fill-current" />
                      <span className="font-medium">{video.views}</span>
                    </div>

                    {/* Hashtag */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black/70 text-white border-0">
                        #{video.hashtag}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hashtags" className="space-y-4">
            <div className="space-y-3">
              {trendingHashtags.map((hashtag, index) => (
                <div key={hashtag.tag} className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:bg-card/80 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-video-gradient rounded-xl flex items-center justify-center shadow-glow-primary">
                      <Hash className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">#{hashtag.tag}</div>
                      <div className="text-muted-foreground text-sm">{hashtag.count} videos</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-500">{hashtag.growth}</div>
                    <div className="text-xs text-muted-foreground">this week</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sounds" className="space-y-4">
            <div className="space-y-3">
              {trendingSounds.map((sound, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:bg-card/80 transition-colors cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center shadow-glow-accent animate-pulse-glow">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium truncate">{sound.name}</div>
                      <div className="text-muted-foreground text-sm">
                        {sound.videos} videos • {sound.duration}
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="ml-2">
                    Use Sound
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}