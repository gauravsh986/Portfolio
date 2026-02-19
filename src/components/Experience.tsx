import React from 'react';
import { Briefcase, Calendar, MapPin, Award, Target } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import ParallaxContainer from './ParallaxContainer';

const Experience: React.FC = () => {
  const experience = {
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    duration: 'Apr 2024 – Present',
    location: 'Mathura, Uttar Pradesh, India',
    type: 'Freelance',
    responsibilities: [
      'Designed and developed custom web and mobile solutions tailored to client needs',
      'Successfully delivered 3 major enterprise-level projects with complete client satisfaction',
      'Implemented full-cycle development approach: requirements gathering, system design, coding, testing, and deployment',
      'Built responsive and scalable applications using modern tech stack (React, Node.js, React Native)',
      'Managed client communications and project timelines effectively',
      'Delivered pixel-perfect UI/UX designs with optimal performance and user experience',
      'Integrated secure payment gateways and real-time data synchronization features',
      'Provided post-deployment support and maintenance for all delivered projects',
      'Established NeuroSpark Technologies as a freelance venture brand'
    ],
    technologies: ['Java', 'React (Vite+TS)', 'Node.js', 'Express.js', 'MySQL', 'Git'],
    achievements: [
      'Successfully completed 3 major projects within deadline',
      'Achieved 100% client satisfaction rate',
      'Built scalable applications serving multiple user roles',
      'Established strong freelance brand presence'
    ]
  };

  return (
    <section id="experience" className="relative py-16 lg:py-20">
      <ParallaxContainer speed={0.1} className="absolute inset-0">
        <div className="h-full bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent" />
      </ParallaxContainer>
      
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="mb-12 lg:mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl font-orbitron">
            <span className="text-transparent bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text">
              Experience
            </span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan" />
          <p className="max-w-2xl mx-auto mt-6 text-gray-400">
            Professional journey in web development and client-focused solutions.
          </p>
        </AnimatedSection>

        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Left Side - Main Experience Info */}
          <AnimatedSection direction="left" delay={200} className="order-2 lg:order-1">
            <div className="p-6 lg:p-8 transition-all duration-300 border glass-card rounded-2xl border-white/10 md:hover:border-neon-cyan/30">
              {/* Header */}
              <div className="mb-6">
                <h3 className="flex items-center gap-3 mb-2 text-xl lg:text-2xl font-bold text-white">
                  <Briefcase className="w-5 h-5 lg:w-6 lg:h-6 text-neon-cyan" />
                  {experience.title}
                </h3>
                <p className="text-base lg:text-lg font-semibold text-neon-cyan">{experience.company}</p>
                
                <div className="flex flex-col gap-2 lg:gap-4 mt-4 text-sm text-gray-400 sm:flex-row">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {experience.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {experience.location}
                  </div>
                  <div className="px-3 py-1 text-xs font-medium border rounded-full bg-neon-blue/20 text-neon-cyan border-neon-blue/30">
                    {experience.type}
                  </div>
                </div>
              </div>

              {/* Key Achievements */}
              <div className="mb-6">
                <h4 className="flex items-center gap-2 mb-4 text-base lg:text-lg font-semibold text-white">
                  <Award className="w-4 h-4 lg:w-5 lg:h-5 text-neon-cyan" />
                  Key Achievements
                </h4>
                <div className="space-y-3">
                  {experience.achievements.map((achievement, index) => (
                    <AnimatedSection
                      key={index}
                      direction="up"
                      delay={200 + index * 25}
                    >
                      <div className="flex items-start gap-3 p-3 lg:p-4 transition-colors duration-300 border rounded-lg bg-white/5 border-white/10 md:hover:border-neon-cyan/30">
                        <div className="flex-shrink-0 w-3 h-3 mt-1 rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan"></div>
                        <span className="text-xs lg:text-sm text-gray-300">{achievement}</span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <AnimatedSection direction="up" delay={250}>
                <div>
                  <h4 className="mb-4 text-base lg:text-lg font-semibold text-white">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {experience.technologies.map((tech, index) => (
                      <span
                        key={tech}
                        className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-colors duration-300 border rounded-lg bg-neon-blue/20 text-neon-cyan border-neon-blue/30 md:hover:border-neon-blue/60"
                        style={{
                          animationDelay: `${250 + index * 25}ms`
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Right Side - Responsibilities */}
          <AnimatedSection direction="right" delay={300} className="order-1 lg:order-2">
            <div className="p-6 lg:p-8 overflow-hidden transition-all duration-300 border glass-card rounded-2xl border-white/10 md:hover:border-neon-cyan/30">
              <h4 className="flex items-center gap-2 mb-6 text-lg lg:text-xl font-semibold text-white">
                <Target className="w-4 h-4 lg:w-5 lg:h-5 text-neon-cyan" />
                Responsibilities & Impact
              </h4>
              
              <div className="space-y-3 lg:space-y-4 overflow-x-hidden overflow-y-auto max-h-80 lg:max-h-96 custom-scrollbar">
                {experience.responsibilities.map((responsibility, index) => (
                  <AnimatedSection
                    key={index}
                    direction="right"
                    delay={150 + index * 10}
                    className="w-full"
                  >
                    <div className="flex items-start w-full gap-3 p-2 lg:p-3 transition-colors duration-300 rounded-lg md:hover:bg-white/5">
                      <div className="w-1.5 h-1.5 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-xs lg:text-sm leading-relaxed text-gray-300 break-words">{responsibility}</span>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* Stats */}
              <div className="pt-4 lg:pt-6 mt-6 lg:mt-8 border-t border-white/10">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="mb-1 text-xl lg:text-2xl font-bold font-orbitron text-neon-cyan">3+</div>
                    <div className="text-xs text-gray-400">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-xl lg:text-2xl font-bold font-orbitron text-neon-cyan">100%</div>
                    <div className="text-xs text-gray-400">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Education Section */}
        <AnimatedSection direction="up" delay={200} className="mt-16 lg:mt-20">
          <h3 className="mb-8 lg:mb-12 text-2xl lg:text-3xl font-bold text-center">
            <span className="text-transparent bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text">
              Education
            </span>
          </h3>
          
          <div className="grid max-w-5xl gap-4 lg:gap-6 mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                degree: 'Bachelor of Computer Applications (BCA)',
                institution: 'Dr. Bhimrao Ambedkar University',
                duration: '2023–2026',
                status: 'Pursuing'
              },
              {
                degree: 'Senior Secondary (XII)',
                institution: 'CBSE Board',
                duration: '2023',
                status: 'Completed'
              },
              {
                degree: 'Secondary (X)',
                institution: 'CBSE Board', 
                duration: '2021',
                status: 'Completed'
              }
            ].map((edu, index) => (
              <AnimatedSection
                key={index}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={250 + index * 25}
              >
                <div className="p-4 lg:p-6 text-center transition-all duration-300 border glass-card rounded-xl border-white/10 md:hover:border-neon-cyan/30 group md:hover:scale-105">
                  <h4 className="mb-2 text-base lg:text-lg font-semibold text-white transition-colors duration-300 md:group-hover:text-neon-cyan">
                    {edu.degree}
                  </h4>
                  <p className="mb-2 text-sm lg:text-base font-medium text-neon-cyan">{edu.institution}</p>
                  <p className="mb-3 text-xs lg:text-sm text-gray-400">{edu.duration}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    edu.status === 'Pursuing' 
                      ? 'bg-neon-blue/20 text-neon-cyan border border-neon-blue/30' 
                      : 'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {edu.status}
                  </span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Experience;
