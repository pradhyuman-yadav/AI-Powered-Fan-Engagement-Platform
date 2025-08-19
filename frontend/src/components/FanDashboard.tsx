import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './ImageWithFallback';
import { MessageCircle, Heart, BookOpen, Trophy, Flame, Star, Clock, TrendingUp } from 'lucide-react';

interface FanDashboardProps {
  onNavigate: (page: string) => void;
  onSelectAuthor: (author: any) => void;
}

export function FanDashboard({ onNavigate, onSelectAuthor }: FanDashboardProps) {
  const [activeTab, setActiveTab] = useState('feed');

  const followingAuthors = [
    {
      id: 1,
      name: "William Shakespeare",
      avatar: "https://tse2.mm.bing.net/th/id/OIP.OKj1u-zviWGstfIdy-XRnAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      lastActive: "2 hours ago",
      newContent: 3
    },
    {
      id: 2,
      name: "Shailu Tipparaju",
      avatar: "https://tse4.mm.bing.net/th/id/OIP.d_85mkDT0cZWgCxPdQlvIwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      lastActive: "1 day ago",
      newContent: 1
    },
    {
      id: 3,
      name: "Sarah Williams",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastActive: "3 hours ago",
      newContent: 5
    }
  ];

  const feedItems = [
    {
      id: 1,
      author: "Shailu Tipparaju",
      authorAvatar: "https://tse4.mm.bing.net/th/id/OIP.d_85mkDT0cZWgCxPdQlvIwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      type: "story",
      title: "shailosophy.life",
      description: "When indifference is shaped by peace rather than scarred by bitterness, it frees you from the invisible prison of expectations towards true emotional freedom.",
      timestamp: "2 hours ago",
      likes: 234,
      comments: 45,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      exclusive: true
    },
    {
      id: 2,
      author: "William Shakespeare",
      authorAvatar: "https://tse2.mm.bing.net/th/id/OIP.OKj1u-zviWGstfIdy-XRnAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      type: "update",
      title: "Writing Update: AI Ethics in Fiction",
      description: "Exploring how we can responsibly portray artificial intelligence in literature...",
      timestamp: "1 day ago",
      likes: 156,
      comments: 28,
      exclusive: false
    },
    {
      id: 3,
      author: "Sarah Williams",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      type: "live",
      title: "Live Q&A Session Tomorrow",
      description: "Join me tomorrow at 7 PM EST for a live discussion about upcoming projects...",
      timestamp: "3 hours ago",
      likes: 89,
      comments: 67,
      upcoming: true
    }
  ];

  const achievements = [
    { name: "First Chat", description: "Had your first AI conversation", earned: true, date: "Jan 15", icon: MessageCircle },
    { name: "Bookworm", description: "Read 10 exclusive stories", earned: true, date: "Jan 20", icon: BookOpen },
    { name: "Community Member", description: "Joined 30 days ago", earned: true, date: "Jan 25", icon: Trophy },
    { name: "Streak Master", description: "7-day reading streak", earned: false, progress: 5, icon: Flame },
    { name: "Super Fan", description: "Support 5 different authors", earned: false, progress: 3, icon: Star }
  ];

  const recommendations = [
    {
      name: "David Park",
      genre: "Mystery",
      reason: "Similar to Elena Rodriguez",
      followers: "45K",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      sample: "Detective Sarah Chen thought she'd seen it all..."
    },
    {
      name: "Luna Martinez",
      genre: "Fantasy",
      reason: "Trending in your area",
      followers: "78K",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b1e8d011?w=150&h=150&fit=crop&crop=face",
      sample: "The ancient magic stirred beneath the city..."
    }
  ];

  const readingStats = {
    streakDays: 5,
    totalMinutes: 1247,
    storiesRead: 23,
    authorsFollowed: 3
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome back!</h1>
        <p className="text-muted-foreground">Your personalized fan experience awaits</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Flame className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="text-sm">Reading Streak</span>
                </div>
                <span className="font-semibold">{readingStats.streakDays} days</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm">Reading Time</span>
                </div>
                <span className="font-semibold">{Math.floor(readingStats.totalMinutes / 60)}h {readingStats.totalMinutes % 60}m</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm">Stories Read</span>
                </div>
                <span className="font-semibold">{readingStats.storiesRead}</span>
              </div>
            </CardContent>
          </Card>

          {/* Following */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Following</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {followingAuthors.map((author) => (
                  <div key={author.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={author.avatar} />
                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{author.name}</p>
                        <p className="text-xs text-muted-foreground">{author.lastActive}</p>
                      </div>
                    </div>
                    {author.newContent > 0 && (
                      <Badge variant="destructive" className="text-xs px-2">
                        {author.newContent}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6 mt-6">
              {feedItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={item.authorAvatar} />
                        <AvatarFallback>{item.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{item.author}</p>
                          {item.exclusive && (
                            <Badge variant="outline" className="text-xs border-primary text-primary">
                              Exclusive
                            </Badge>
                          )}
                          {item.upcoming && (
                            <Badge variant="destructive" className="text-xs">
                              Live Soon
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.timestamp}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    {item.image && (
                      <div className="mb-4 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>{item.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-foreground transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>{item.comments}</span>
                        </button>
                      </div>
                      <Button size="sm" variant="outline">
                        {item.type === 'live' ? 'Join Live' : 'Read More'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="discover" className="space-y-6 mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Recommended for You
                  </h3>
                  <div className="grid gap-6">
                    {recommendations.map((author, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={author.avatar} />
                              <AvatarFallback>{author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-semibold">{author.name}</h4>
                                <Badge variant="secondary">{author.genre}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {author.followers} followers • {author.reason}
                              </p>
                              <p className="text-sm italic text-muted-foreground mb-4">
                                "{author.sample}..."
                              </p>
                              <Button size="sm">Follow & Explore</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6 mt-6">
              <div className="grid gap-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <Card key={index} className={`${achievement.earned ? 'bg-accent/20 border-primary/20' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            achievement.earned ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{achievement.name}</h4>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            {achievement.earned ? (
                              <p className="text-xs text-green-600 mt-1">Earned on {achievement.date}</p>
                            ) : achievement.progress !== undefined ? (
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span>{achievement.progress}/{achievement.name === 'Streak Master' ? 7 : 5}</span>
                                </div>
                                <Progress 
                                  value={(achievement.progress / (achievement.name === 'Streak Master' ? 7 : 5)) * 100} 
                                  className="h-2" 
                                />
                              </div>
                            ) : null}
                          </div>
                          {achievement.earned && (
                            <Badge className="bg-green-500 text-white">Earned</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Chat */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {followingAuthors.slice(0, 2).map((author) => (
                  <Button
                    key={author.id}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      onSelectAuthor(author);
                      onNavigate('author-profile');
                    }}
                  >
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src={author.avatar} />
                      <AvatarFallback>{author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Chat with {author.name.split(' ')[0]}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Completed "Dragon's Awakening"</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Earned "Bookworm" achievement</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Joined Elena's live session</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}