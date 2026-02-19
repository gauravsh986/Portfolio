import React from 'react';
import AnimatedSection from './AnimatedSection';
import ParallaxContainer from './ParallaxContainer';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'JavaScript', level: 92 },
        { name: 'HTML/CSS', level: 88 },
        { name: 'Tailwind CSS', level: 85 },
      ],
    },
    {
      title: 'Backend & Database',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Express.js', level: 85 },
        { name: 'MySQL/SQLite', level: 82 },
        { name: 'MongoDB', level: 78 },
        { name: 'Appwrite', level: 45 },
      ],
    },
    {
      title: 'Mobile & Cloud',
      skills: [
        { name: 'React Native', level: 85 },
        { name: 'Next.js', level: 50 },
        { name: 'Vite', level: 80 },
        { name: 'PHP', level: 75 },
        { name: 'Twilio', level: 40 },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-16 lg:py-20">
      <ParallaxContainer speed={0.1} className="absolute inset-0">
        <div className="h-full bg-gradient-to-b from-transparent via-neon-violet/5 to-transparent" />
      </ParallaxContainer>
      
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="mb-12 text-center lg:mb-16">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl font-orbitron">
            <span className="text-transparent bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text">
              Technical Skills
            </span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan" />
          <p className="max-w-2xl mx-auto mt-6 text-sm text-gray-400 lg:text-base">
            My expertise across the full technology stack, constantly evolving with industry trends.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <AnimatedSection
              key={category.title}
              direction={categoryIndex % 2 === 0 ? 'left' : 'right'}
              delay={100 + categoryIndex * 50}
              className="p-6 transition-all duration-300 border glass-card lg:p-8 rounded-2xl border-white/10 md:hover:border-neon-cyan/30 group"
            >
              <h3 className="mb-6 text-xl font-bold text-center transition-colors duration-300 lg:text-2xl font-orbitron lg:mb-8 md:group-hover:text-neon-cyan">
                {category.title}
              </h3>
              
              <div className="space-y-4 lg:space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white lg:text-base">{skill.name}</span>
                      <span className="text-xs font-semibold text-neon-cyan lg:text-sm">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-2 transition-all duration-1000 ease-out rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan"
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${(categoryIndex * 5 + skillIndex) * 0.02}s`,
                        }}
                      />
                    </div>
                    
                    {/* Skill level indicator */}
                    <div 
                      className="absolute w-2 h-2 transition-all duration-1000 ease-out transform -translate-y-1/2 rounded-full top-8 lg:top-9 bg-neon-cyan"
                      style={{
                        left: `calc(${skill.level}% - 4px)`,
                        animationDelay: `${(categoryIndex * 5 + skillIndex) * 0.02}s`,
                      }}
                    >
                      <div className="absolute inset-0 rounded-full opacity-75 bg-neon-cyan animate-ping" />
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Additional Skills Cloud */}
        <AnimatedSection direction="up" delay={200} className="mt-12 lg:mt-16">
          <h3 className="mb-6 text-xl font-bold text-center text-white lg:text-2xl lg:mb-8">
            Additional Technologies
          </h3>
          
          <AnimatedSection direction="up" delay={250} className="flex flex-wrap justify-center gap-3 lg:gap-4">
            {[
              'JavaScript', 'TypeScript', 'React', 'React Native', 'Next.js',
              'Vite', 'HTML', 'CSS', 'Tailwind CSS', 'PHP',
              'Node.js', 'Express.js', 'MySQL', 'SQLite', 'Appwrite',
              'Twilio', 'ShadCN', 'Sentry', 'Git', 'UI/UX Design', 'SEO Optimization'
            ].map((tech, index) => (
              <span
                key={tech}
                className="px-3 py-2 text-xs text-gray-300 transition-all duration-300 border rounded-full lg:px-4 glass-card border-white/20 lg:text-sm md:hover:text-neon-cyan md:hover:border-neon-cyan/40 md:hover:scale-105"
                style={{
                  animationDelay: `${index * 0.01}s`,
                }}
              >
                {tech}
              </span>
            ))}
          </AnimatedSection>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Skills;