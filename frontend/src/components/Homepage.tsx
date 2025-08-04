import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './ImageWithFallback';
import { MessageCircle, Zap, Users, Star, ArrowRight, BookOpen, Video, DollarSign } from 'lucide-react';

interface HomepageProps {
  onNavigate: (page: string) => void;
  onSelectAuthor: (author: any) => void;
}

const featuredAuthors = [
  {
    id: 1,
    name: "Elena Rodriguez",
    genre: "Fantasy",
    followers: "125K",
    books: 8,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b1e8d011?w=150&h=150&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
    description: "NYT Bestselling author of the Mystic Realms series"
  },
  {
    id: 2,
    name: "Marcus Chen",
    genre: "Sci-Fi",
    followers: "89K",
    books: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=200&fit=crop",
    description: "Hugo Award winner exploring AI and humanity"
  },
  {
    id: 3,
    name: "Sarah Williams",
    genre: "Romance",
    followers: "203K",
    books: 12,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    banner: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
    description: "Contemporary romance that touches hearts"
  }
];

export function Homepage({ onNavigate, onSelectAuthor }: HomepageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              AI-Powered Fan Engagement
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Connect with Your
              <br />
              Favorite Authors
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Experience personalized interactions with AI-powered conversations, exclusive content, 
              and direct access to the minds behind your favorite stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => onNavigate('fan-dashboard')} className="text-lg px-8">
                Start Exploring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onNavigate('creator-dashboard')} className="text-lg px-8">
                Join as Creator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Revolutionary Fan Experience
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI technology creates meaningful connections between fans and creators
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card to-accent/5 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>AI-Powered Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Chat with AI personas trained on your favorite authors' works, 
                  getting insights into their creative process and story worlds.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card to-accent/5 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Exclusive Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access behind-the-scenes content, early drafts, character backstories, 
                  and exclusive stories available only to fans.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-card to-accent/5 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Live Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join live Q&A sessions, book readings, and writing workshops 
                  with AI-enhanced interaction and real-time insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Authors Section */}
      <section className="py-20 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Authors
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover amazing creators and start your journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredAuthors.map((author) => (
              <Card key={author.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-0">
                <div className="relative h-32 overflow-hidden">
                  <ImageWithFallback
                    src={author.banner}
                    alt={`${author.name} banner`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
                    {author.genre}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="w-12 h-12 mr-4 border-2 border-background shadow-sm">
                      <AvatarImage src={author.avatar} />
                      <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{author.name}</h3>
                      <p className="text-sm text-muted-foreground">{author.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {author.followers} followers
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {author.books} books
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      onSelectAuthor(author);
                      onNavigate('author-profile');
                    }}
                  >
                    Connect & Chat
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Fan Experience?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of fans already connecting with their favorite authors through AI-powered conversations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => onNavigate('fan-dashboard')} className="text-lg px-8">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}