import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VisitSection from './components/VisitSection';
import ShopsDirectory from './components/ShopsDirectory';
import NewsSection from './components/NewsSection';
import AboutSection from './components/AboutSection';
import GovernanceSection from './components/GovernanceSection';
import PlanningSection from './components/PlanningSection';
import Footer from './components/Footer';
import AccessibilityPanel from './components/AccessibilityPanel';
import './App.css';

function App() {
  const [isAccessibilityPanelOpen, setIsAccessibilityPanelOpen] = useState(false);

  const toggleAccessibilityPanel = () => {
    setIsAccessibilityPanelOpen(!isAccessibilityPanelOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAccessibilityToggle={toggleAccessibilityPanel} />
      
      <main id="main-content">
        <Hero />
        <VisitSection />
        <ShopsDirectory />
        <NewsSection />
        <AboutSection />
        <GovernanceSection />
        <PlanningSection />
      </main>
      
      <Footer />
      
      <AccessibilityPanel 
        isOpen={isAccessibilityPanelOpen} 
        onClose={() => setIsAccessibilityPanelOpen(false)} 
      />
    </div>
  );
}

export default App;
