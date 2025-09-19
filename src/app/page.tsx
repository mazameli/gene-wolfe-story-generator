'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// Placeholder data - will be replaced with your actual options
const storyData = {
  protagonist: ['wanderer', 'scholar', 'soldier', 'exile'],
  form: ['letter', 'journal', 'confession', 'memoir'],
  mind_type: ['fragments', 'deceives him', 'betrays him', 'plays tricks'],
  setting: ['in a distant future', 'in a dying world', 'beyond the sun', 'in the shadow of the torturer'],
  jump_type: ['through time', 'between memories', 'through dreams', 'between worlds'],
  journey: ['to redemption', 'to understanding', 'to the truth', 'home']
};

const getRandomItem = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

const StoryText = ({ story }: { story: { [key: string]: string } }) => {
  const storyTemplate = `This story is about a {protagonist}, who's telling their story in the form of a {form}, but whose mind {mind_type}. The story is set {setting} as he jumps back and forth {jump_type} on his way {journey}.`;

  const renderStoryWithHighlights = (template: string, values: { [key: string]: string }) => {
    const parts = template.split(/(\{[^}]+\})/);
    
    return parts.map((part, index) => {
      const match = part.match(/\{([^}]+)\}/);
      if (match) {
        const key = match[1];
        return (
          <motion.span
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: "spring",
              bounce: 0.3
            }}
            className="text-purple-300 font-semibold bg-purple-900/30 px-2 py-1 rounded-md border border-purple-500/30"
          >
            {values[key] || key}
          </motion.span>
        );
      }
      return (
        <span key={index} className="text-white/90">
          {part}
        </span>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-center max-w-5xl mx-auto"
    >
      {renderStoryWithHighlights(storyTemplate, story)}
    </motion.div>
  );
};

const NewStoryButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)"
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
    >
      New Story
    </motion.button>
  );
};

const ParticleBackground = () => {
  const particles = Array.from({ length: 30 }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20"
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 3,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [currentStory, setCurrentStory] = useState(() => ({
    protagonist: getRandomItem(storyData.protagonist),
    form: getRandomItem(storyData.form),
    mind_type: getRandomItem(storyData.mind_type),
    setting: getRandomItem(storyData.setting),
    jump_type: getRandomItem(storyData.jump_type),
    journey: getRandomItem(storyData.journey),
  }));

  const generateNewStory = () => {
    setCurrentStory({
      protagonist: getRandomItem(storyData.protagonist),
      form: getRandomItem(storyData.form),
      mind_type: getRandomItem(storyData.mind_type),
      setting: getRandomItem(storyData.setting),
      jump_type: getRandomItem(storyData.jump_type),
      journey: getRandomItem(storyData.journey),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      
      {/* Header with New Story button */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-8 pb-4 text-center"
      >
        <NewStoryButton onClick={generateNewStory} />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
          Gene Wolfe Story Generator
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto px-4">
          Infinite variations on the master's narrative style
        </p>
      </motion.div>

      {/* Main Story Display */}
      <div className="relative z-10 flex items-center justify-center min-h-[50vh] px-8">
        <StoryText story={currentStory} />
      </div>

      {/* Footer hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="relative z-10 text-center pb-8"
      >
        <p className="text-white/40 text-sm">
          Click "New Story" to generate a different variation
        </p>
      </motion.div>
    </div>
  );
}
