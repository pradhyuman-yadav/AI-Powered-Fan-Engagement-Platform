import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Users, 
  DollarSign, 
  MessageCircle, 
  TrendingUp, 
  Calendar, 
  Upload,
  Settings,
  Eye,
  Heart,
  AlertTriangle,
  CheckCircle,
  Edit3,
  Plus
} from 'lucide-react';

interface CreatorDashboardProps {
  onNavigate: (page: string) => void;
}

export function CreatorDashboard({ onNavigate }: CreatorDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [newContentTitle, setNewContentTitle] = useState('');
  const [newContentBody, setNewContentBody] = useState('');

  const stats = {
    totalFollowers: 125847,
    monthlyRevenue: 5420,
    totalChats: 8234,
    engagement: 94.2
  };

  const recentContent = [
    {
      id: 1,
      title: "The Lost Chapter: Aeron's Backstory",
      type: "Exclusive Story",
      views: 2341,
      likes: 456,
      comments: 78,
      revenue: 234,
      status: "published",
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Writing Process Deep Dive",
      type: "Behind-the-Scenes",
      views: 1876,
      likes: 234,
      comments: 45,
      revenue: 156,
      status: "published",
      date: "1 week ago"
    },
    {
      id: 3,
      title: "Character Development Workshop",
      type: "Live Session",
      views: 892,
      likes: 145,
      comments: 89,
      revenue: 445,
      status: "scheduled",
      date: "Tomorrow 7 PM"
    }
  ];

  const subscriptionTiers = [
    {
      name: "Basic Reader",
      price: 4.99,
      subscribers: 1247,
      revenue: 6219.53,
      features: ["AI Chat Access", "Monthly Newsletter", "Community Access"]
    },
    {
      name: "Devoted Fan", 
      price: 9.99,
      subscribers: 678,
      revenue: 6773.22,
      features: ["Everything in Basic", "Exclusive Content", "Early Access", "Monthly Live Session"]
    },
    {
      name: "Inner Circle",
      price: 19.99,
      subscribers: 234,
      revenue: 4677.66,
      features: ["Everything in Devoted", "1-on-1 Monthly Chat", "Manuscript Reviews", "Signed Books"]
    }
  ];

  const flaggedInteractions = [
    {
      id: 1,
      user: "Anonymous User",
      message: "Inappropriate content detected in chat...",
      severity: "medium",
      action: "pending"
    },
    {
      id: 2,
      user: "BookLover23",
      message: "Spam detected: repeated promotional messages",
      severity: "low",
      action: "resolved"
    }
  ];

  const audienceData = [
    { age: "18-24", percentage: 15 },
    { age: "25-34", percentage: 35 },
    { age: "35-44", percentage: 30 },
    { age: "45-54", percentage: 15 },
    { age: "55+", percentage: 5 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Creator Dashboard</h1>
        <p className="text-muted-foreground">Manage your content, audience, and earnings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="monetization">Monetization</TabsTrigger>
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalFollowers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12.5%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.2%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Chats</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalChats.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+23.1%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.engagement}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2.4%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Content Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Content Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContent.map((content) => (
                  <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{content.title}</h4>
                        <Badge variant={content.status === 'published' ? 'default' : 'secondary'}>
                          {content.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{content.type} • {content.date}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {content.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {content.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {content.comments}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          ${content.revenue}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6 mt-6">
          {/* Create New Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create New Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="content-title">Title</Label>
                  <Input
                    id="content-title"
                    value={newContentTitle}
                    onChange={(e) => setNewContentTitle(e.target.value)}
                    placeholder="Enter content title..."
                  />
                </div>
                <div>
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="story">Exclusive Story</SelectItem>
                      <SelectItem value="update">Writing Update</SelectItem>
                      <SelectItem value="behind-scenes">Behind-the-Scenes</SelectItem>
                      <SelectItem value="live">Live Session</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="content-body">Content</Label>
                <Textarea
                  id="content-body"
                  value={newContentBody}
                  onChange={(e) => setNewContentBody(e.target.value)}
                  placeholder="Write your content here..."
                  rows={6}
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch id="exclusive" />
                  <Label htmlFor="exclusive">Exclusive content</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="ai-training" />
                  <Label htmlFor="ai-training">Include in AI training</Label>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button>Publish Now</Button>
                <Button variant="outline">Save Draft</Button>
                <Button variant="outline">Schedule</Button>
              </div>
            </CardContent>
          </Card>

          {/* Content Library */}
          <Card>
            <CardHeader>
              <CardTitle>Content Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContent.map((content) => (
                  <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{content.title}</h4>
                      <p className="text-sm text-muted-foreground">{content.type} • {content.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={content.status === 'published' ? 'default' : 'secondary'}>
                        {content.status}
                      </Badge>
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Analytics</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6 mt-6">
          {/* Audience Demographics */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {audienceData.map((segment) => (
                    <div key={segment.age}>
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span>{segment.age}</span>
                        <span>{segment.percentage}%</span>
                      </div>
                      <Progress value={segment.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">The Lost Chapter</span>
                    <span className="text-sm font-medium">2.3k views</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Writing Process Deep Dive</span>
                    <span className="text-sm font-medium">1.9k views</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Character Workshop</span>
                    <span className="text-sm font-medium">892 views</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Followers */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Followers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=32&h=32&fit=crop&crop=face`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Reader{i}</p>
                        <p className="text-xs text-muted-foreground">{i} day{i > 1 ? 's' : ''} ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Profile</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monetization" className="space-y-6 mt-6">
          {/* Subscription Tiers */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Tiers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {subscriptionTiers.map((tier, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{tier.name}</h4>
                        <p className="text-sm text-muted-foreground">${tier.price}/month</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Subscribers</p>
                        <p className="text-lg font-semibold">{tier.subscribers}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                        <p className="text-lg font-semibold">${tier.revenue.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversion Rate</p>
                        <p className="text-lg font-semibold">
                          {((tier.subscribers / stats.totalFollowers) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {tier.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">$17,670</p>
                  <p className="text-sm text-muted-foreground">Total Monthly Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">$2,340</p>
                  <p className="text-sm text-muted-foreground">Tips & One-time</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">$890</p>
                  <p className="text-sm text-muted-foreground">Merchandise</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation" className="space-y-6 mt-6">
          {/* AI Moderation Settings */}
          <Card>
            <CardHeader>
              <CardTitle>AI Moderation Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-moderate inappropriate content</p>
                  <p className="text-sm text-muted-foreground">Automatically filter harmful or inappropriate messages</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Spam detection</p>
                  <p className="text-sm text-muted-foreground">Detect and filter repetitive or promotional content</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Profanity filter</p>
                  <p className="text-sm text-muted-foreground">Filter messages containing profanity</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Flagged Interactions */}
          <Card>
            <CardHeader>
              <CardTitle>Flagged Interactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flaggedInteractions.map((interaction) => (
                  <div key={interaction.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className={`w-4 h-4 ${
                          interaction.severity === 'high' ? 'text-red-500' : 
                          interaction.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                        }`} />
                        <span className="font-medium">{interaction.user}</span>
                        <Badge variant={
                          interaction.severity === 'high' ? 'destructive' : 
                          interaction.severity === 'medium' ? 'default' : 'secondary'
                        }>
                          {interaction.severity}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {interaction.action === 'resolved' ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Resolved
                          </Badge>
                        ) : (
                          <>
                            <Button variant="outline" size="sm">Dismiss</Button>
                            <Button variant="destructive" size="sm">Block User</Button>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{interaction.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}