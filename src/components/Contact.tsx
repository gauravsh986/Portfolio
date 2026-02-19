import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, ChevronDown, CheckCircle, Clock } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import ParallaxContainer from './ParallaxContainer';
import backendWarmer from '../utils/backendWarmer';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    mobile: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const [showFailedPopup, setShowFailedPopup] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const countries = [
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+1', flag: '🇺🇸', name: 'USA' },
    { code: '+44', flag: '🇬🇧', name: 'UK' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+86', flag: '🇨🇳', name: 'China' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
    { code: '+82', flag: '🇰🇷', name: 'South Korea' },
    { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  ];

  const selectedCountry = countries.find(country => country.code === formData.countryCode) || countries[0];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearchTerm.toLowerCase()) ||
    country.code.includes(countrySearchTerm)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
        setCountrySearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send immediate ping to warm up backend before form submission
      await backendWarmer.pingNow();
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccessPopup(true);
        setFormData({ name: '', email: '', countryCode: '+91', mobile: '', message: '' });
        setTimeout(() => setShowSuccessPopup(false), 5000);
      } else {
        if (response.status === 429) {
          setTimeRemaining(result.timeRemaining || 24);
          setShowLimitPopup(true);
        } else {
          setShowFailedPopup(true);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setShowFailedPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // For mobile number, only allow digits and limit to 10 characters
    if (name === 'mobile') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({
        ...formData,
        [name]: numericValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCountrySelect = (countryCode: string) => {
    setFormData({
      ...formData,
      countryCode,
    });
    setIsCountryDropdownOpen(false);
    setCountrySearchTerm('');
  };

  const handleCountrySearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && filteredCountries.length > 0) {
      e.preventDefault();
      handleCountrySelect(filteredCountries[0].code);
    } else if (e.key === 'Escape') {
      setIsCountryDropdownOpen(false);
      setCountrySearchTerm('');
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'gauravsh986@gmail.com',
      link: 'mailto:gauravsh986@gmail.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+91 95288 46056',
      link: 'tel:+919528846056',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'Mathura, Uttar Pradesh, India',
      link: '#',
    },
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, name: 'GitHub', link: 'https://github.com/gauravsh986', color: 'hover:text-white' },
    { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn', link: 'https://www.linkedin.com/in/gaurav-sharma-280755252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', color: 'hover:text-cyan-400' },
    { 
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
      </svg>, 
      name: 'WhatsApp', 
      link: 'https://wa.me/919528846056?text=Hi%20Gaurav%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20career%20opportunity%20with%20you%2E', 
      color: 'hover:text-green-400' 
    },
    { icon: <Mail className="w-5 h-5" />, name: 'Gmail', link: 'https://mail.google.com/mail/?view=cm&fs=1&to=gauravsh986@gmail.com', color: 'hover:text-red-400' },
    { icon: <Instagram className="w-5 h-5" />, name: 'Instagram', link: 'https://www.instagram.com/gaurav_sharma37?igsh=YjdqMjR0NmQ5czN0', color: 'hover:text-pink-400' },
  ];

  return (
    <section id="contact" className="relative py-16 lg:py-20">
      <ParallaxContainer speed={0.05} className="absolute inset-0">
        <div className="h-full bg-gradient-to-b from-transparent via-neon-blue/5 to-dark/20" />
      </ParallaxContainer>
      
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="mb-12 text-center lg:mb-16">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl font-orbitron">
            <span className="text-transparent bg-gradient-to-r from-neon-blue to-neon-cyan bg-clip-text">
              Get In Touch
            </span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-neon-blue to-neon-cyan" />
          <p className="max-w-2xl mx-auto mt-6 text-sm text-gray-400 lg:text-base">
            Ready to bring your next project to life? Let's discuss how we can work together to create something amazing.
          </p>
        </AnimatedSection>

        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <AnimatedSection direction="left" delay={200} className="space-y-6 lg:space-y-8">
            <div>
              <h3 className="mb-4 text-xl font-bold text-white lg:mb-6 lg:text-2xl font-orbitron">
                Let's Connect
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-300 lg:mb-8 lg:text-base">
                I'm always excited to discuss new opportunities, interesting projects, or just chat about technology. 
                Whether you're looking for a freelance developer, have a project in mind, or want to collaborate, 
                I'd love to hear from you.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-3 lg:space-y-4">
              {contactInfo.map((info, index) => (
                <AnimatedSection
                  key={index}
                  direction="left"
                  delay={400 + index * 100}
                >
                  <a
                    href={info.link}
                    className="flex items-center gap-3 p-3 transition-all duration-300 border rounded-lg lg:gap-4 lg:p-4 glass-card border-white/10 md:hover:border-neon-cyan/30 group md:hover:scale-105"
                  >
                  <div className="transition-transform duration-300 text-neon-cyan md:group-hover:scale-110">
                    {info.icon}
                  </div>
                  <div>
                    <div className="mb-1 text-xs text-gray-400 lg:text-sm">{info.title}</div>
                    <div className="text-sm font-medium text-white transition-colors duration-300 lg:text-base md:group-hover:text-neon-cyan">
                      {info.value}
                    </div>
                  </div>
                  </a>
                </AnimatedSection>
              ))}
            </div>

            {/* Social Links */}
            <AnimatedSection direction="left" delay={800}>
              <h4 className="mb-3 text-base font-semibold text-white lg:mb-4 lg:text-lg">Follow Me</h4>
              <div className="flex gap-3 lg:gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 lg:p-3 glass-card border border-white/20 rounded-lg md:hover:border-neon-cyan/40 transition-all duration-300 md:hover:scale-110 text-gray-400 ${social.color}`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection direction="right" delay={400} className="p-6 transition-colors duration-300 border lg:p-8 glass-card rounded-2xl border-white/10 md:hover:border-neon-cyan/20">
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 gap-4 lg:gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors duration-300 border rounded-lg lg:px-4 lg:py-3 lg:text-base bg-white/5 border-white/20 focus:border-neon-cyan focus:outline-none"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-300">
                    Mobile Number *
                  </label>
                  <div className="flex w-full">
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="flex items-center gap-1 px-2 py-2 text-xs text-white transition-colors duration-300 border rounded-l-lg lg:gap-2 lg:px-3 lg:py-3 lg:text-sm bg-white/5 border-white/20 md:hover:border-neon-cyan focus:border-neon-cyan focus:outline-none whitespace-nowrap"
                      >
                        <span className="text-sm lg:text-lg -mt-0.5 pb-1 md:pb-0" style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}>{selectedCountry.flag}</span>
                        <span className="text-xs lg:text-sm">{selectedCountry.code}</span>
                        <ChevronDown className={`w-3 h-3 lg:w-4 lg:h-4 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isCountryDropdownOpen && (
                        <div className="absolute left-0 z-50 w-40 mt-1 overflow-y-auto border rounded-lg shadow-xl lg:w-48 top-full bg-dark/95 backdrop-blur-sm border-white/20 max-h-48">
                          <div className="p-2 border-b border-white/10">
                            <input
                              type="text"
                              placeholder="Search country..."
                              value={countrySearchTerm}
                              onChange={(e) => setCountrySearchTerm(e.target.value)}
                              onKeyDown={handleCountrySearchKeyDown}
                              className="w-full px-2 py-1 text-xs text-white placeholder-gray-400 transition-colors duration-300 border rounded lg:px-3 lg:py-2 lg:text-sm bg-white/5 border-white/20 focus:border-neon-cyan focus:outline-none"
                              autoFocus
                            />
                          </div>
                          {filteredCountries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => handleCountrySelect(country.code)}
                              className="flex items-center w-full gap-2 px-2 py-2 text-xs text-left text-white transition-colors duration-200 lg:gap-3 lg:px-3 lg:text-sm md:hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg"
                            >
                              <span className="text-sm lg:text-lg -mt-0.5 pb-1 md:pb-0" style={{ fontFamily: 'Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif' }}>{country.flag}</span>
                              <span className="flex-1">{country.name}</span>
                              <span className="text-xs text-gray-400 lg:text-sm">{country.code}</span>
                            </button>
                          ))}
                          {filteredCountries.length === 0 && (
                            <div className="px-2 py-2 text-xs text-gray-400 lg:px-3 lg:text-sm">
                              No countries found
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength={10}
                      pattern="[0-9]{10}"
                      className="flex-1 min-w-0 px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors duration-300 border border-l-0 rounded-r-lg lg:px-4 lg:py-3 lg:text-base bg-white/5 border-white/20 focus:border-neon-cyan focus:outline-none"
                      placeholder="1234567890"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors duration-300 border rounded-lg lg:px-4 lg:py-3 lg:text-base bg-white/5 border-white/20 focus:border-neon-cyan focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition-colors duration-300 border rounded-lg resize-none lg:px-4 lg:py-3 lg:text-base bg-white/5 border-white/20 focus:border-neon-cyan focus:outline-none"
                  placeholder="Tell me about your project... (optional)"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center w-full gap-2 px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-semibold transition-all duration-300 rounded-lg ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-neon-blue to-neon-cyan md:hover:scale-105'
                } text-dark group`}
              >
                <Send className={`w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 ${isSubmitting ? '' : 'md:group-hover:translate-x-1'}`} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </AnimatedSection>
        </div>

        {/* Footer */}
        <AnimatedSection direction="up" delay={200} className="pt-6 mt-16 text-center border-t lg:pt-8 lg:mt-20 border-white/10">
          <p className="text-sm text-gray-400 lg:text-base">
            © 2025 Gaurav Sharma. Crafted with passion and cutting-edge technology.
          </p>
        </AnimatedSection>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-xs p-6 border sm:max-w-md lg:p-8 glass-card rounded-2xl border-white/20 bg-dark/95">
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute z-50 flex items-center justify-center flex-shrink-0 w-8 h-8 p-2 text-gray-400 transition-colors duration-200 rounded-full top-4 right-4 md:hover:text-white hover:bg-white/10"
              type="button"
              style={{ minWidth: '32px', minHeight: '32px' }}
            >
              <svg className="w-4 h-4 pointer-events-none lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-green-400 lg:w-16 lg:h-16" />
              </div>
              
              <h3 className="mb-2 text-lg font-bold text-white lg:text-xl">Message Sent Successfully!</h3>
              <p className="mb-4 text-sm text-gray-300 lg:text-base">
                Thank you for reaching out! I'll get back to you within 24-48 hours.
              </p>
              
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg lg:px-6 lg:text-base bg-gradient-to-r from-neon-blue to-neon-cyan text-dark md:hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rate Limit Popup */}
      {showLimitPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative max-w-xs p-6 border sm:max-w-md lg:p-8 glass-card rounded-2xl border-white/20 bg-dark/95">
            <button
              onClick={() => setShowLimitPopup(false)}
              className="absolute z-50 flex items-center justify-center flex-shrink-0 w-8 h-8 p-2 text-gray-400 transition-colors duration-200 rounded-full top-4 right-4 md:hover:text-white hover:bg-white/10"
              type="button"
              style={{ minWidth: '32px', minHeight: '32px' }}
            >
              <svg className="w-4 h-4 pointer-events-none lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Clock className="w-12 h-12 text-yellow-400 lg:w-16 lg:h-16" />
              </div>
              
              <h3 className="mb-2 text-lg font-bold text-white lg:text-xl">Rate Limit Reached</h3>
              <p className="mb-4 text-sm text-gray-300 lg:text-base">
                You can only send one message per 24 hours. Please wait approximately {timeRemaining} hour{timeRemaining !== 1 ? 's' : ''} before sending another message.
              </p>
              
              <button
                onClick={() => setShowLimitPopup(false)}
                className="px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg lg:px-6 lg:text-base bg-gradient-to-r from-yellow-500 to-orange-500 text-dark md:hover:scale-105"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Failed Popup */}
      {showFailedPopup && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowFailedPopup(false)}
        >
          <div 
            className="relative max-w-sm p-6 border sm:max-w-lg lg:p-8 glass-card rounded-2xl border-white/20 bg-dark/95"
            onClick={(e) => e.stopPropagation()}
          >            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full lg:w-16 lg:h-16 bg-red-500/20">
                  <svg className="w-6 h-6 text-red-400 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              
              <h3 className="mb-3 text-lg font-bold text-white lg:text-xl">Oops! Something Went Wrong</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-300 lg:text-base">
                I'm sorry, but there seems to be a technical issue with the contact form. Don't worry though - I'd still love to hear from you!
              </p>
              
              <div className="p-4 mb-6 border rounded-lg bg-white/5 border-white/10">
                <h4 className="mb-3 text-sm font-semibold text-neon-cyan lg:text-base">Alternative Contact Methods:</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                    <Mail className="flex-shrink-0 w-4 h-4 text-neon-cyan" />
                    <div className="text-left">
                      <div className="text-xs text-gray-400">Email</div>
                      <a href="mailto:gauravsh986@gmail.com" className="text-sm text-white transition-colors hover:text-neon-cyan">
                        gauravsh986@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                    <Phone className="flex-shrink-0 w-4 h-4 text-neon-cyan" />
                    <div className="text-left">
                      <div className="text-xs text-gray-400">Phone</div>
                      <a href="tel:+919528846056" className="text-sm text-white transition-colors hover:text-neon-cyan">
                        +91 95288 46056
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://wa.me/919548667656?text=Hi%20Ved%2C%20I%20tried%20to%20contact%20you%20through%20your%20portfolio%20website%20but%20encountered%20a%20technical%20issue.%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 bg-green-600 rounded-lg lg:px-6 lg:text-base hover:bg-green-700 hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp
                </a>
                
                <button
                  onClick={() => setShowFailedPopup(false)}
                  className="px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-lg lg:px-6 lg:text-base bg-gradient-to-r from-neon-blue to-neon-cyan text-dark hover:scale-105"
                >
                  Try Again
                </button>
              </div>
              
              <p className="mt-4 text-xs text-gray-400">
                Sorry for the inconvenience. I'll fix this issue soon!
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;