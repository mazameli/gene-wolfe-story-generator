'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const storyData = {
  protagonist: ['an apprentice torturer', 'a wizard', 'a priest', 'a juice factory worker', 'a soldier', 'a clone'],
  form: ['novel sent back through spacetime', 'series of letters', 'journal on a scroll of papyrus', 'posthumous memoir', 'journal on loose pages of paper'],
  mind_type: ['melds with his dead lover\'s', 'merges with his murderer\'s', 'is placed into the body of his childhood hero', 'is put into the body of a fully-grown man', 'can\'t form long-term memories'],
  mind_event: ['eating some funky soup', 'praying to an alien on his deathbed', 'being stuck in purgatory', 'unexpectedly inheriting some property', 'getting a head wound'], 
  setting: ['in the midwest', 'on postapocalypic Earth', 'in a two-planet star system'],
  jump_type: ['through time', 'in the narrative', 'between a fantasy realm and reality'],
  sidekick: ['three-legged dog', 'talking bird', 'giant robot', 'shape-shifting alien', 'eight-legged alien pig dog', 'sexy Japanese fox-woman spirit'],
  journey: ['towards the frontlines of a war', 'back home from the frontlines of a war', 'towards finding his pocketknife', 'to a new planet', 'to a divine plane of existence']
};

const getRandomItem = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

const StoryText = ({ story }: { story: { [key: string]: string } }) => {
  const storyTemplate = `This story is about {protagonist}, who's telling his story in the form of a {form}, but whose mind {mind_type} as a result of {mind_event}. The story is set {setting} as the hero jumps back and forth {jump_type} with his {sidekick} sidekick on his way {journey}.`;

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
      className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-left max-w-5xl mx-auto"
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
      className="cursor-pointer mt-16 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-xl"
    >
      New Story
    </motion.button>
  );
};

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    left: number;
    top: number;
    duration: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Generate particles on client-side only
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) {
    return <div className="fixed inset-0 overflow-hidden pointer-events-none" />;
  }
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20"
          animate={{
            x: [0, particle.x],
            y: [0, particle.y],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: "reverse",
            delay: particle.delay,
          }}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [currentStory, setCurrentStory] = useState({
    protagonist: storyData.protagonist[0],
    form: storyData.form[0],
    mind_type: storyData.mind_type[0],
    mind_event: storyData.mind_event[0],
    setting: storyData.setting[0],
    jump_type: storyData.jump_type[0],
    sidekick: storyData.sidekick[0],
    journey: storyData.journey[0],
  });

  // Generate random story on client-side only
  useEffect(() => {
    setCurrentStory({
      protagonist: getRandomItem(storyData.protagonist),
      form: getRandomItem(storyData.form),
      mind_type: getRandomItem(storyData.mind_type),
      mind_event: getRandomItem(storyData.mind_event),
      setting: getRandomItem(storyData.setting),
      jump_type: getRandomItem(storyData.jump_type),
      sidekick: getRandomItem(storyData.sidekick),
      journey: getRandomItem(storyData.journey),
    });
  }, []);

  const generateNewStory = () => {
    setCurrentStory({
      protagonist: getRandomItem(storyData.protagonist),
      form: getRandomItem(storyData.form),
      mind_type: getRandomItem(storyData.mind_type),
      mind_event: getRandomItem(storyData.mind_event),
      setting: getRandomItem(storyData.setting),
      jump_type: getRandomItem(storyData.jump_type),
      sidekick: getRandomItem(storyData.sidekick),
      journey: getRandomItem(storyData.journey),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <ParticleBackground />
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center pt-24 mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
          Gene Wolfe Story Generator
        </h1>
        <div className="flex justify-center">
          <p className="text-lg md:text-xl text-white/60 max-w-2xl px-4 text-center">
            A dumb thing by Maz
          </p>
        </div>
      </motion.div>

      {/* Prominent New Story Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 text-center mb-16"
      >
        <NewStoryButton onClick={generateNewStory} />
      </motion.div>

      {/* Main Story Display */}
      <div className="relative z-10 flex items-center justify-center min-h-[40vh] px-8">
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
          Click &quot;New Story&quot; to generate a different variation
        </p>
      </motion.div>
    </div>
  );
}
