import { useState, useRef, useEffect } from "react";
import { Send, Settings2, Bot, User, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai_api_key') || '');
  const [systemPrompt, setSystemPrompt] = useState(() => 
    localStorage.getItem('system_prompt') || 'You are a helpful AI assistant. Be concise and friendly.'
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveApiKey = (key: string) => {
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
  };

  const saveSystemPrompt = (prompt: string) => {
    localStorage.setItem('system_prompt', prompt);
    setSystemPrompt(prompt);
  };

  const sendMessage = async () => {
    if (!input.trim() || !apiKey) {
      if (!apiKey) {
        toast({
          title: "API Key Required",
          description: "Please add your OpenAI API key in settings.",
          variant: "destructive"
        });
      }
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: userMessage.content }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response from OpenAI. Check your API key.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: "Chat Cleared",
      description: "All messages have been removed."
    });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">ChatGPT Clone</h1>
            <p className="text-sm text-muted-foreground">
              {messages.length} messages
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {!apiKey && (
            <Badge variant="destructive" className="text-xs">
              No API Key
            </Badge>
          )}
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings2 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">OpenAI API Key</label>
                  <div className="flex space-x-2">
                    <Input
                      type="password"
                      placeholder="sk-..."
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={() => saveApiKey(apiKey)} size="sm">
                      <Key className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Stored locally in your browser
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">System Prompt</label>
                  <Textarea
                    placeholder="You are a helpful AI assistant..."
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <Button 
                    onClick={() => saveSystemPrompt(systemPrompt)} 
                    className="mt-2 w-full" 
                    size="sm"
                  >
                    Save System Prompt
                  </Button>
                </div>

                <Button onClick={clearChat} variant="outline" className="w-full">
                  Clear Chat History
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Ready to Chat!</h2>
              <p className="text-muted-foreground max-w-md">
                Start a conversation with your AI assistant. Ask questions, get help with tasks, or just chat!
              </p>
            </div>
            {!apiKey && (
              <Card className="p-4 max-w-md border-amber-500/50 bg-amber-500/5">
                <div className="flex items-start space-x-3">
                  <Key className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-amber-500">API Key Required</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Add your OpenAI API key in settings to start chatting.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-user-message text-white' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {message.role === 'user' ? 
                    <User className="w-4 h-4" /> : 
                    <Bot className="w-4 h-4" />
                  }
                </div>
                
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-user-message text-white ml-auto'
                    : 'bg-assistant-message hover:bg-message-hover transition-colors'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <div className={`text-xs mt-2 opacity-70 ${
                    message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary/10 text-primary">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-assistant-message rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card/30 backdrop-blur-lg">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Textarea
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="min-h-[48px] max-h-32 resize-none pr-12 pt-3"
              disabled={!apiKey || isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || !apiKey || isLoading}
              size="sm"
              className="absolute right-2 bottom-2 w-8 h-8 p-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {!apiKey && (
          <p className="text-xs text-muted-foreground mt-2">
            Add your OpenAI API key in settings to start chatting
          </p>
        )}
      </div>
    </div>
  );
}