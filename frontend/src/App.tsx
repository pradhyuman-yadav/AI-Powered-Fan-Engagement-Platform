import React, { useState } from 'react';
import { Homepage } from './components/Homepage';
import { AuthorProfile } from './components/AuthorProfile';
import { FanDashboard } from './components/FanDashboard';
import { CreatorDashboard } from './components/CreatorDashboard';
import { LiveSession } from './components/LiveSession';
import { Navigation } from './components/Navigation';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage onNavigate={setCurrentPage} onSelectAuthor={setSelectedAuthor} />;
      case 'author-profile':
        return <AuthorProfile author={selectedAuthor} onNavigate={setCurrentPage} />;
      case 'fan-dashboard':
        return <FanDashboard onNavigate={setCurrentPage} onSelectAuthor={setSelectedAuthor} />;
      case 'creator-dashboard':
        return <CreatorDashboard onNavigate={setCurrentPage} />;
      case 'live-session':
        return <LiveSession onNavigate={setCurrentPage} />;
      default:
        return <Homepage onNavigate={setCurrentPage} onSelectAuthor={setSelectedAuthor} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="pt-16">
        {renderCurrentPage()}
      </main>
    </div>
  );
}