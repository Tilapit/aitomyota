import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import ComparisonSection from './components/ComparisonSection';
import ProfilesSection from './components/ProfilesSection';
import QuizTeaserSection from './components/QuizTeaserSection';
import Footer from './components/Footer';
import QuizModal from './components/QuizModal';

const App: React.FC = () => {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <>
      <Navbar onOpenQuiz={() => setQuizOpen(true)} />
      <main>
        <HeroSection onOpenQuiz={() => setQuizOpen(true)} />
        <HowItWorksSection />
        <ComparisonSection />
        <ProfilesSection />
        <QuizTeaserSection onOpenQuiz={() => setQuizOpen(true)} />
      </main>
      <Footer />
      <QuizModal isOpen={quizOpen} onClose={() => setQuizOpen(false)} />
    </>
  );
};

export default App;
