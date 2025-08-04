import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { 
  Users, 
  Heart, 
  Gift, 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff,
  Volume2,
  VolumeX,
  Settings,
  Share,
  Bot,
  Sparkles,
  DollarSign,
  TrendingUp
} from 'lucide-react';

interface LiveSessionProps {
  onNavigate: (page: string) => void;
}

interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  message: string;
  timestamp: Date;
  type: 'chat' | 'tip' | 'system';
  amount?: number;
}

export function LiveSession({ onNavigate }: LiveSessionProps) {
  const [isLive] = useState(true);
  const [viewers] = useState(892);
  const [chatMessage, setChatMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showAISummary, setShowAISummary] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: 'BookLover23',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b1e8d011?w=32&h=32&fit=crop&crop=face',
      message: 'So excited for this session! Love your character development techniques.',
      timestamp: new Date(Date.now() - 120000),
      type: 'chat'
    },
    {
      id: '2',
      user: 'FantasyFan88',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      message: 'tipped $5',
      timestamp: new Date(Date.now() - 90000),
      type: 'tip',
      amount: 5
    },
    {
      id: '3',
      user: 'WriterInTraining',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      message: 'Can you talk about how you develop villain motivations?',
      timestamp: new Date(Date.now() - 60000),
      type: 'chat'
    },
    {
      id: '4',
      user: 'System',
      avatar: '',
      message: 'AI Summary: Popular questions focus on character development, world-building techniques, and villain creation.',
      timestamp: new Date(Date.now() - 30000),
      type: 'system'
    }
  ]);

  const sessionInfo = {
    title: "Character Development Workshop",
    author: "Elena Rodriguez",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b1e8d011?w=150&h=150&fit=crop&crop=face",
    startTime: "7:00 PM EST",
    duration: "1 hour",
    topic: "Creating Compelling Characters",
    totalTips: 234
  };

  const popularQuestions = [
    "How do you develop realistic character flaws?",
    "What's your process for character backstories?",
    "How do you balance multiple character arcs?",
    "Tips for writing believable dialogue?"
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      user: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      message: chatMessage,
      timestamp: new Date(),
      type: 'chat'
    };

    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Video Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Video Player */}
          <Card className="overflow-hidden">
            <div className="relative aspect-video bg-black rounded-t-lg">
              {/* Video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Live Video Stream</p>
                  <p className="text-sm opacity-75">Elena Rodriguez - Character Development Workshop</p>
                </div>
              </div>
              
              {/* Live Badge */}
              {isLive && (
                <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-500">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                  LIVE
                </Badge>
              )}

              {/* Viewer Count */}
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                <Users className="w-4 h-4 inline mr-1" />
                {viewers.toLocaleString()} viewers
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="bg-black/70 hover:bg-black/80"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                  <div className="w-20">
                    <Progress value={volume} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="secondary" size="icon" className="bg-black/70 hover:bg-black/80">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="icon" className="bg-black/70 hover:bg-black/80">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={sessionInfo.authorAvatar} />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{sessionInfo.title}</h2>
                    <p className="text-muted-foreground">with {sessionInfo.author}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span>{sessionInfo.startTime}</span>
                      <span>•</span>
                      <span>{sessionInfo.duration}</span>
                      <span>•</span>
                      <span className="flex items-center">
                        <DollarSign className="w-3 h-3 mr-1" />
                        ${sessionInfo.totalTips} in tips
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-2" />
                    Follow
                  </Button>
                  <Button size="sm">
                    <Gift className="w-4 h-4 mr-2" />
                    Tip
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                Join me for an interactive workshop on character development. We'll explore techniques for creating 
                compelling, three-dimensional characters that readers will love and remember.
              </p>

              {/* Quick Tip Buttons */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Quick tip:</span>
                {[2, 5, 10, 20].map((amount) => (
                  <Button key={amount} variant="outline" size="sm">
                    ${amount}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Summary */}
          {showAISummary && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Bot className="w-5 h-5 mr-2" />
                  AI Session Insights
                  <Badge variant="secondary" className="ml-2 text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Most Asked Questions:</h4>
                    <div className="space-y-1">
                      {popularQuestions.slice(0, 3).map((question, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex items-center">
                          <TrendingUp className="w-3 h-3 mr-2 text-primary" />
                          {question}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Topics Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Character Flaws", "Backstory Creation", "Dialogue Writing", "Character Arcs"].map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Chat Sidebar */}
        <div className="lg:col-span-1">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                Live Chat
                <Badge variant="secondary">{viewers} online</Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-3">
                  {chatMessages.map((message) => (
                    <div key={message.id} className={`flex space-x-2 ${
                      message.type === 'system' ? 'justify-center' : 'justify-start'
                    }`}>
                      {message.type !== 'system' && (
                        <Avatar className="w-6 h-6 flex-shrink-0">
                          <AvatarImage src={message.avatar} />
                          <AvatarFallback>{message.user[0]}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`flex-1 ${message.type === 'system' ? 'text-center' : ''}`}>
                        {message.type === 'system' ? (
                          <div className="bg-accent/50 text-xs p-2 rounded-lg border">
                            <Bot className="w-3 h-3 inline mr-1" />
                            {message.message}
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center space-x-1 mb-1">
                              <span className="text-xs font-medium">{message.user}</span>
                              {message.type === 'tip' && (
                                <Badge variant="outline" className="text-xs border-green-500 text-green-600">
                                  <Gift className="w-2 h-2 mr-1" />
                                  ${message.amount}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {message.type === 'tip' ? `tipped $${message.amount}` : message.message}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask a question or share your thoughts..."
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleSendMessage} disabled={!chatMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Be respectful and follow community guidelines
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}