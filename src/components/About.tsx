import React from 'react';
import { Code, Database, Smartphone, Globe } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import ParallaxContainer from './ParallaxContainer';

const About: React.FC = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Frontend Development',
      description: 'React, TypeScript, Vite, HTML, CSS',
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Backend Development',
      description: 'Node.js, Express.js, MySQL, SQLite',
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile Development',
      description: 'React Native, Cross-platform apps',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Languages & Tools',
      description: 'JavaScript, Python, C/C++, Git',
    },
  ];

  return (
    <section id="about" className="relative py-16 lg:py-20">
      <ParallaxContainer speed={0.1} className="absolute inset-0">
        <div className="h-full bg-gradient-to-b from-transparent via-neon-violet/5 to-transparent" />
      </ParallaxContainer>
      
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="mb-12 lg:mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl font-orbitron">
            <span className="text-transparent bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan" />
        </AnimatedSection>

        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <AnimatedSection direction="left" delay={200} className="space-y-4 lg:space-y-6">
            <p className="text-base lg:text-lg leading-relaxed text-gray-300">
              I'm an enthusiastic BCA student and aspiring full-stack developer with hands-on experience 
              from academic and freelance projects. I specialize in building scalable and user-friendly 
              applications using modern technologies.
            </p>
            
            <p className="text-base lg:text-lg leading-relaxed text-gray-300">
              Currently pursuing Bachelor of Computer Applications at Dr. Bhimrao Ambedkar University, 
              I'm skilled in React, Node.js, Java, and MySQL. I'm passionate about creating 
              innovative digital solutions and constantly exploring emerging technologies.
            </p>

            <div className="flex flex-wrap gap-3 lg:gap-4 mt-6 lg:mt-8">
              {['React', 'TypeScript', 'Node.js', 'React Native', 'MySQL', 'JavaScript'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 lg:px-4 py-2 text-sm lg:text-base font-medium transition-colors duration-300 border rounded-lg glass-card border-neon-blue/30 text-neon-cyan md:hover:border-neon-blue/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* Features Grid */}
          <AnimatedSection direction="right" delay={150} className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2">
            {features.map((feature, index) => (
              <AnimatedSection
                key={index}
                direction="up"
                delay={200 + index * 50}
                className="p-4 lg:p-6 transition-all duration-300 border glass-card rounded-xl border-white/10 md:hover:border-neon-cyan/30 group md:hover:scale-105"
              >
                <div className="mb-3 lg:mb-4 transition-transform duration-300 text-neon-cyan md:group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg lg:text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </AnimatedSection>
            ))}
          </AnimatedSection>
        </div>

        {/* Stats */}
        <AnimatedSection direction="up" delay={150} className="grid grid-cols-2 gap-6 lg:gap-8 mt-12 lg:mt-16 md:grid-cols-4">
          {[
            { number: '3+', label: 'Projects Completed' },
            { number: '1+', label: 'Years Experience' },
            { number: '3+', label: 'Happy Clients' },
            { number: '10+', label: 'Technologies' },
          ].map((stat, index) => (
            <AnimatedSection key={index} direction="up" delay={200 + index * 25} className="text-center">
              <div className="mb-2 text-2xl font-bold sm:text-3xl lg:text-4xl font-orbitron text-neon-cyan">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
            </AnimatedSection>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default About;