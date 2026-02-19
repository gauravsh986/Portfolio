import React from 'react';
import AnimatedSection from './AnimatedSection';
import ParallaxContainer from './ParallaxContainer';

const Reviews: React.FC = () => {
  const reviews = [
    // Row 1 - Clients and Friends
    {
      id: 1,
      name: "Utkarsh Sharma",
      username: "LBMS PVT LTD - Director",
      content: "Ved delivered an exceptional e-commerce platform and website that exceeded all our expectations. The solution is professional, scalable, and has significantly boosted our online presence. Outstanding technical expertise and dedication to quality!",
      verified: true,
      badge: "CLIENT"
    },
    {
      id: 2,
      name: "Avni Hotel",
      username: "Hospitality Industry",
      content: "The hotel management software Ved developed has revolutionized our operations. From booking management to staff coordination, everything is seamless. Professional service with incredible attention to detail. Highly recommended!",
      verified: true,
      badge: "CLIENT"
    },
    {
      id: 3,
      name: "B-FIT GYM",
      username: "Fitness Center",
      content: "The gym management system Ved created has streamlined our entire business. Member management, payment tracking, and scheduling are now effortless. Professional, reliable, and exactly what we needed. 100% satisfied!",
      verified: true,
      badge: "CLIENT"
    },
    {
      id: 4,
      name: "Gaurav Sharma",
      username: "Classmate",
      content: "Dude, your coding skills are insane! That portfolio website is fire 🔥 The animations and design are next level. Keep crushing it bro!",
      verified: true,
      badge: "FRIEND"
    },
    {
      id: 5,
      name: "Dev Sharma",
      username: "Classmate",
      content: "Bro, your projects are always mind-blowing! That React portfolio is sick. You're definitely going places with these skills. Keep it up man! 💪",
      verified: true,
      badge: "FRIEND"
    }
  ];

  const reviews2 = [
    // Row 2 - Teachers and Friends
    {
      id: 6,
      name: "Chandresh Dubey",
      username: "Head of Department",
      content: "Ved Sharma is one of the most exceptional students I've had the privilege to teach. His technical prowess, innovative thinking, and dedication to excellence make him a standout developer. I'm proud to see his remarkable achievements.",
      verified: true,
      badge: "HOD"
    },
    {
      id: 7,
      name: "PHP Teacher",
      username: "Web Development Professor",
      content: "Ved's mastery of PHP and web development concepts is impressive. His projects demonstrate not just technical skill but creative problem-solving. He consistently delivers work that exceeds academic expectations. Truly proud of his progress.",
      verified: true,
      badge: "Teacher"
    },
    {
      id: 8,
      name: "OS Teacher",
      username: "Operating Systems Professor",
      content: "Ved demonstrates exceptional understanding of operating system concepts and their practical applications. His ability to bridge theoretical knowledge with real-world implementation is commendable. A truly dedicated student.",
      verified: true,
      badge: "Teacher"
    },
    {
      id: 9,
      name: "C++ Teacher",
      username: "Programming Languages Professor",
      content: "Ved's proficiency in C++ and object-oriented programming principles is remarkable. His clean code structure and innovative solutions to complex problems showcase his deep understanding. I'm proud to have been part of his learning journey.",
      verified: true,
      badge: "Teacher"
    },
    {
      id: 10,
      name: "Satyam Bharadwaj",
      username: "Classmate",
      content: "Dude's coding game is unreal! Always helps me with tough programming problems. That portfolio site is absolutely stunning. You're gonna be famous bro! 🚀",
      verified: true,
      badge: "FRIEND"
    }
  ];

  const reviews3 = [
    // Row 3 - Friends
    {
      id: 11,
      name: "Suraj Thakur",
      username: "Classmate",
      content: "Living with this guy and seeing him code late nights is inspiring! The dedication is real. That NeuroSpark website looks so professional. Keep grinding! 💯",
      verified: true,
      badge: "FRIEND"
    },
    {
      id: 12,
      name: "Prashant",
      username: "Classmate",
      content: "When he's not gaming with us, he's creating these amazing websites! That portfolio is sick bro. Your clients are lucky to have you! 🎮💻",
      verified: true,
      badge: "FRIEND"
    },
    {
      id: 13,
      name: "Pankaj Gautam",
      username: "Classmate",
      content: "This guy codes like he plays cricket - with precision and style! That React Native app is awesome. You're the tech genius of our group! 🏏💻",
      verified: true,
      badge: "FRIEND"
    },
    {
      id: 14,
      name: "Tanuj Singh",
      username: "Classmate",
      content: "Always saves my assignments with his coding skills! That portfolio website is next level. You're going to be a successful entrepreneur for sure! 🔥",
      verified: true,
      badge: "FRIEND"
    }
  ];

  const ReviewCard = ({ review, onClick }: { review: any, onClick?: () => void }) => {
    const getInitials = (name: string) => {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };
    
    const getBadgeColor = (badge: string) => {
      switch (badge) {
        case 'CLIENT':
          return 'bg-green-500/20 text-green-400 border-green-500/40';
        case 'HOD':
          return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
        case 'Teacher':
          return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
        case 'PROFESSOR':
          return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
        case 'FRIEND':
          return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
        default:
          return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
      }
    };

    return (
      <div 
        className="flex-shrink-0 p-3 lg:p-4 mx-1 lg:mx-2 transition-all duration-300 border border-gray-200 rounded-lg w-64 lg:w-72 backdrop-blur-md bg-white/5 dark:bg-white/5 dark:border-white/10 md:hover:border-neon-cyan/30 md:hover:bg-white/10"
        onClick={onClick}
      >
        <div className="flex items-start gap-2 lg:gap-3">
          <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 text-xs lg:text-sm font-bold rounded-full bg-gradient-to-br from-neon-blue to-neon-cyan text-dark">
            {getInitials(review.name)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1 lg:gap-2">
                <h4 className="text-xs lg:text-sm font-semibold text-gray-900 truncate dark:text-white">{review.name}</h4>
                {review.verified && (
                  <div className="flex-shrink-0 w-3 h-3 lg:w-4 lg:h-4 text-cyan-400">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                )}
              </div>
              <span className={`px-2 py-1 text-xs font-medium border rounded-full ${getBadgeColor(review.badge)}`}>
                {review.badge}
              </span>
            </div>
            <span className="block mb-1 lg:mb-2 text-xs text-gray-600 dark:text-gray-400">{review.username}</span>
            <p className="text-xs lg:text-sm leading-relaxed text-gray-700 dark:text-gray-300 line-clamp-3">{review.content}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="reviews" className="relative py-16 lg:py-20 overflow-hidden">
      <ParallaxContainer speed={0.15} className="absolute inset-0">
        <div className="h-full bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent" />
      </ParallaxContainer>
      
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <AnimatedSection direction="up" delay={50} className="mb-12 lg:mb-16 text-center">
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl lg:text-4xl xl:text-5xl font-orbitron">
            <span className="text-transparent bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text">
              Reviews from my clients & loving friends
            </span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan" />
        </AnimatedSection>

        <div className="space-y-6 lg:space-y-8">
          {/* Row 1 - Moving Right */}
          <div className="relative overflow-hidden group">
            <div 
              className="flex animate-scroll-right group-hover:pause"
              style={{
                width: 'calc(256px * 10)', // Adjust for smaller card width
              }}
            >
              {[...reviews, ...reviews].map((review, index) => (
                <ReviewCard key={`${review.id}-${index}`} review={review} />
              ))}
            </div>
          </div>

          {/* Row 2 - Moving Left */}
          <div className="relative overflow-hidden group">
            <div 
              className="flex animate-scroll-left group-hover:pause"
              style={{
                width: 'calc(256px * 10)', // Adjust for smaller card width
              }}
            >
              {[...reviews2, ...reviews2].map((review, index) => (
                <ReviewCard key={`${review.id}-${index}`} review={review} />
              ))}
            </div>
          </div>

          {/* Row 3 - Moving Right */}
          <div className="relative overflow-hidden group">
            <div 
              className="flex animate-scroll-right group-hover:pause"
              style={{
                width: 'calc(256px * 8)', // Adjust for smaller card width
              }}
            >
              {[...reviews3, ...reviews3].map((review, index) => (
                <ReviewCard key={`${review.id}-${index}`} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
