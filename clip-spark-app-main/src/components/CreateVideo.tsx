import { useState } from "react";
import { Camera, Video, Music, Upload, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export default function CreateVideo() {
  const [selectedMode, setSelectedMode] = useState<'camera' | 'upload' | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRecord = () => {
    setSelectedMode('camera');
    // Simulate recording process
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const handleUpload = () => {
    setSelectedMode('upload');
    // Simulate upload process
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-20">
        <div className="text-center space-y-6 px-6">
          <div className="w-24 h-24 bg-success-gradient rounded-full flex items-center justify-center mx-auto shadow-glow-accent animate-pulse-glow">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Video Posted!</h2>
            <p className="text-muted-foreground">Your video is now live and ready to go viral! 🚀</p>
          </div>
          <Button 
            className="bg-video-gradient text-white hover:scale-105 transition-transform shadow-glow-primary"
            onClick={() => setSelectedMode(null)}
          >
            Create Another
          </Button>
        </div>
      </div>
    );
  }

  if (selectedMode === 'camera') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pb-20">
        {/* Camera Preview Mock */}
        <div className="relative w-full h-full max-w-sm mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-blue-900/30 flex items-center justify-center">
            <div className="text-white text-center space-y-4">
              <Video className="w-16 h-16 mx-auto animate-pulse" />
              <p className="text-lg font-medium">Recording...</p>
              <div className="w-3 h-3 bg-red-500 rounded-full mx-auto animate-pulse" />
            </div>
          </div>

          {/* Recording Controls */}
          <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center space-x-8">
            <Button
              variant="ghost"
              size="sm"
              className="w-12 h-12 rounded-full bg-black/50 text-white"
              onClick={() => setSelectedMode(null)}
            >
              <X className="w-6 h-6" />
            </Button>
            
            <div className="w-20 h-20 border-4 border-white rounded-full flex items-center justify-center bg-red-500 animate-pulse-glow">
              <div className="w-16 h-16 bg-red-600 rounded-full" />
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-12 h-12 rounded-full bg-black/50 text-white"
            >
              <Upload className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMode === 'upload') {
    return (
      <div className="min-h-screen bg-background p-6 pb-20">
        <div className="max-w-md mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setSelectedMode(null)}>
              <X className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Upload Video</h1>
            <div className="w-10" />
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center space-y-4 bg-card/50">
            <div className="w-16 h-16 bg-video-gradient rounded-full flex items-center justify-center mx-auto shadow-glow-primary">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Upload Your Video</h3>
              <p className="text-muted-foreground text-sm">
                Drag and drop your video here, or tap to browse
              </p>
            </div>
            <Button className="bg-video-gradient text-white hover:scale-105 transition-transform">
              Browse Files
            </Button>
          </div>

          {/* Video Details Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea 
                placeholder="Describe your video... #hashtags"
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Music Selection */}
            <div className="p-4 border border-border rounded-lg bg-card/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-video-gradient rounded-lg flex items-center justify-center">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Add Music</p>
                    <p className="text-sm text-muted-foreground">Choose from our library</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Browse
                </Button>
              </div>
            </div>

            {/* Privacy & Options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Who can view this video</span>
                <Badge variant="secondary">Public</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Allow comments</span>
                <Badge variant="secondary" className="bg-primary text-primary-foreground">On</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Allow downloads</span>
                <Badge variant="outline">Off</Badge>
              </div>
            </div>

            {/* Post Button */}
            <Button 
              className="w-full bg-video-gradient text-white hover:scale-105 transition-transform shadow-glow-primary py-6 text-lg font-semibold"
              onClick={handleUpload}
            >
              Post Video
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center pb-20">
      <div className="max-w-sm mx-auto px-6 space-y-8 text-center">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold bg-video-gradient bg-clip-text text-transparent">
            Create Video
          </h1>
          <p className="text-muted-foreground">
            Record a new video or upload from your gallery
          </p>
        </div>

        {/* Action Cards */}
        <div className="space-y-4">
          <div 
            className="p-6 border border-border rounded-2xl bg-card hover:bg-card/80 transition-all duration-200 cursor-pointer group hover:scale-105 hover:shadow-glow-primary"
            onClick={handleRecord}
          >
            <div className="w-16 h-16 bg-video-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Record Video</h3>
            <p className="text-muted-foreground text-sm">
              Use your camera to record a new video
            </p>
          </div>

          <div 
            className="p-6 border border-border rounded-2xl bg-card hover:bg-card/80 transition-all duration-200 cursor-pointer group hover:scale-105 hover:shadow-glow-accent"
            onClick={handleUpload}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Video</h3>
            <p className="text-muted-foreground text-sm">
              Choose a video from your gallery
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-card/30 p-4 rounded-lg border border-border">
          <h4 className="font-medium mb-2">📱 Tips for great videos:</h4>
          <ul className="text-sm text-muted-foreground space-y-1 text-left">
            <li>• Keep it under 60 seconds</li>
            <li>• Use good lighting</li>
            <li>• Add trending music</li>
            <li>• Include relevant hashtags</li>
          </ul>
        </div>
      </div>
    </div>
  );
}