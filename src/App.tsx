import React, { useState } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import ComparisonSection from './ComparisonSection';
import ProfilesSection from './ProfilesSection'; 
import QuizTeaserSection from './QuizTeaserSection';
import Footer from './Footer';
import QuizModal from './QuizModal';

const App: React.FC = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenQuiz={() => setQuizOpen(true)} />
        <main>
        <HeroSection onOpenQuiz={() => setQuizOpen(true)} />
        <HeroSection onOpenQuiz={() => setQuizOpen(true)} />
        <HowItWorksSection />
        <ComparisonSection />
        <ProfilesSection />
        <QuizTeaserSection onOpenQuiz={() => setQuizOpen(true)} />
      </main>
      <Footer />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </div>
  );
};

export default App;