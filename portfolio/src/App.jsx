/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */
import React, { useState, useEffect } from 'react';
import { User, Code, Star, Briefcase, Send, ChevronUp, Mail, Phone, MapPin, Twitter, Facebook, Linkedin, Github, Database, Feather, Link } from 'lucide-react';

const API_URL = 'http://localhost:5000'; 


const theme = {
  primaryBg: 'bg-gray-900',
  secondaryBg: 'bg-white',
  accentColor: 'text-amber-500',
  accentBg: 'bg-amber-500',
  textBase: 'text-gray-800',
  textLight: 'text-gray-400'
};

const userData = {
  name: "Vejanand Sindhiya",
  title: "Aspiring Software Engineer | MERN Specialist",
  tagline: "I transform complex requirements into clean, functional, and scalable digital experiences using the MERN stack and strong CS fundamentals.",
  about: "As an aspiring Software Engineer, I bring a solid foundation in the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) and core computer science concepts, including **Java for DSA**, OOPS, and DBMS. My philosophy is rooted in solving real-world problems through hands-on development and continuous learning. I am eager to contribute to dynamic projects that demand high performance, clean code, and effective team collaboration. I aim to contribute to impactful projects and grow by solving real-world problems.",
  profileImageUrl: "https://i.postimg.cc/R05jhSD8/Gemini-Generated-Image-aw3cgraw3cgraw3c-removebg-preview.png", 
  email: "vejanand4@gmail.com",
  phone: "+91-7984327947",
  location: "Jamnagar, India",
  socials: {
    linkedin: "https://www.linkedin.com/in/vejanand-gadhavi-b988a6263",
    github: "https://github.com/Engineer-vejanand",
    twitter: "https://x.com/Iamvvgdv?t=wbRhnGzk_2R-vXfFvrms_A&s=09",
    facebook: "https://www.facebook.com/share/1A6kqUiie2/",
  }
};

const experience = [
    {
      id: 1,
      title: "Web Development Intern (MERN Stack)",
      company: "CreArt Solutions, Ahmedabad",
      duration: "July 2025",
      description: "Gained foundational expertise in the MERN stack. Actively practiced front-end and back-end integration through focused training sessions to build fully functional web applications.",
      tags: ["React", "Express.js", "MongoDB", "Node.js"]
    }
];

const skills = [
  { id: 1, name: 'MERN Stack', description: "Full-stack development: MongoDB, Express.js, React.js, Node.js, and RESTful API creation.", icon: Code, color: 'bg-sky-500' },
  { id: 2, name: 'Core CS / Java (DSA)', description: "Expertise in Data Structures and Algorithms, utilizing Java, alongside OOPS, DBMS, and OS fundamentals.", icon: Star, color: 'bg-red-500' },
  { id: 3, name: 'Databases & Tools', description: "Proficient with MySQL, MongoDB, Git, GitHub, and API testing with Postman.", icon: Database, color: 'bg-emerald-600' },
  { id: 4, name: 'Styling & UI/UX', description: "Rapid, responsive design using Tailwind CSS and professional component integration with Material UI.", icon: Feather, color: 'bg-cyan-500' },
];

const projects = [
  { 
    id: 1, 
    title: "Health-o-care Platform (MERN)", 
    description: "A comprehensive health-care platform offering doctor appointments, medicine purchases, and symptom checking. Integrated Paytm payment gateway and used Redux for state management.", 
    tags: ["MERN Stack", "Material UI", "Redux", "Paytm Gateway"], 
    role: "Full-Stack Dev", 
    link: null,
    isOngoing: true 
  },
  { 
    id: 2, 
    title: "Interactive Quiz App (MERN)", 
    description: "Built a MERN-based quiz app with secure user authentication, dynamic question fetching via Google API, and real-time score display.", 
    tags: ["Node.js", "Express.js", "MongoDB", "Google API"], 
    role: "Full-Stack Dev", 
    link: "https://quizzwizzy.web.app/",
    isOngoing: false 
  },
];


// --- Utility Components ---

const SectionTitle = ({ children }) => (
  <h2 className={`text-3xl font-extrabold mb-8 ${theme.textBase} relative inline-block`}>
    {children}
    <div className={`absolute bottom-[-10px] left-0 w-1/4 h-1 ${theme.accentBg}`}></div>
  </h2>
);

const SidebarNavItem = ({ sectionId, icon: Icon, label, active }) => (
  <a
    href={`#${sectionId}`}
    onClick={(e) => {
      e.preventDefault();
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }}
    className={`flex flex-col items-center justify-center w-full p-2 py-4 rounded-xl transition-colors duration-300 group hover:bg-amber-600 ${
      active ? 'bg-amber-600 text-white shadow-xl' : 'text-gray-400 hover:text-white'
    }`}
    title={label}
  >
    <Icon className="w-6 h-6 mb-1" />
    <span className="text-xs font-medium">{label}</span>
  </a>
);

const SocialIcon = ({ icon: Icon, href, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" 
        className={`p-2 rounded-full transition-colors duration-300 border border-gray-700 text-gray-400 hover:${theme.accentBg} hover:border-amber-500 hover:text-white`}
        title={label}
    >
      <Icon className="w-5 h-5" />
    </a>
);



// --- Main App Component ---

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showScroll, setShowScroll] = useState(false);


// Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false); 


  // --- Scroll Logic ---
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }


   // Determine active section based on scroll position
    const sections = ['contact', 'projects', 'skills', 'experience', 'about', 'home'];
    const currentScrollPos = window.scrollY + window.innerHeight / 3;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element && currentScrollPos >= element.offsetTop) {
        setActiveSection(sectionId);
        break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
        setStatus('Error: Please fill in all fields.');
        return;
    }

    setIsSubmitting(true);
    setStatus('Sending message...');
    
    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok && data.success) {
            setStatus('Success! Message received and saved. I\'ll respond shortly.');
            setFormData({ name: '', email: '', message: '' });
        } else {
            setStatus(`Error: ${data.message || 'Server failed to process the request.'}`);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        setStatus('Error: Could not connect to the server. Check server status and API URL.');
    } finally {
        setIsSubmitting(false);
    }
  };


  // --- Section Data ---
  const sections = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: Code },
    { id: 'experience', label: 'Exp.', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Star },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  return (
    <div className="min-h-screen font-sans bg-gray-100 antialiased">
      <nav className={`fixed top-0 left-0 h-full w-20 ${theme.primaryBg} shadow-2xl z-50 p-2 pt-4 hidden sm:flex flex-col items-center justify-center`}>
        <div className="flex flex-col space-y-4 pt-16 w-full">
          {sections.map((sec) => (
            <SidebarNavItem
              key={sec.id}
              sectionId={sec.id}
              icon={sec.icon}
              label={sec.label}
              active={activeSection === sec.id}
            />
          ))}
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 ${theme.primaryBg} z-50 shadow-2xl p-2 sm:hidden`}>
          <div className="flex justify-around">
            {sections.map((sec) => (
              <SidebarNavItem
                key={sec.id}
                sectionId={sec.id}
                icon={sec.icon}
                label={sec.label}
                active={activeSection === sec.id}
              />
            ))}
          </div>
      </nav>

      {/* Main Content Area */}
      <main className="sm:ml-20 mb-20 sm:mb-0">
        
        {/* Home Section (Hero) */}
        <section id="home" className={`relative flex flex-col justify-center items-center h-[90vh] ${theme.primaryBg} p-8 overflow-hidden mb-12`}>
          
          {/* Subtle Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(#FFF 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-center max-w-6xl w-full">
            
            {/* Text Content */}
            <div className="text-center md:text-left md:w-1/2 p-4 pt-10">
              <p className={`text-xl font-light mb-2 ${theme.textLight}`}>Hello, I'm</p>
              <h1 className={`text-5xl sm:text-7xl font-black mb-2 text-white tracking-wide`}>
                {userData.name.split(' ')[0]} <span className={`${theme.accentColor}`}>{userData.name.split(' ')[1]}</span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-light mb-4 text-gray-300">
                {userData.title}
              </h2>
              <p className={`text-md text-gray-500 mb-8 italic max-w-sm mx-auto md:mx-0`}>{userData.tagline}</p>
              
              <a
                href="#contact"
                className={`inline-block px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${theme.accentBg} text-white shadow-xl hover:bg-amber-600`}
              >
                Get In Touch
              </a>
            </div>

            {/* Profile Picture */}
            <div className="md:w-1/2 p-4 flex justify-center mt-8 md:mt-0">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                <div className={`absolute inset-0 rounded-full border-4 border-dashed border-gray-700 animate-spin-slow`} style={{ animationDuration: '40s' }}></div>
                <div className={`absolute inset-4 rounded-full border-4 border-dashed ${theme.accentColor} opacity-70 animate-spin-slow-reverse`} style={{ animationDuration: '30s' }}></div>
                
                <div className="absolute inset-8 rounded-full overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-gray-800">
                  <img
                    src={userData.profileImageUrl}
                    alt={`${userData.name}'s Profile`}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x600/171717/F59E0B?text=S.V."; }}
                  />
                </div>
                </div>
              </div>
            </div>
        </section>



        {/* About Section */}
        <section id="about" className={`p-6 sm:p-12 max-w-7xl mx-auto mb-12`}>
            <div className={`${theme.secondaryBg} rounded-xl shadow-lg p-8 sm:p-12`}>
                <SectionTitle>About Me</SectionTitle>
                <div className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-1 space-y-4 p-6 border-r border-gray-200 hidden lg:block">
                        <div className="flex items-center text-gray-700">
                            <Mail className={`w-5 h-5 mr-3 ${theme.accentColor}`} />
                            <span className="font-semibold">Email:</span>
                            <a href={`mailto:${userData.email}`} className="ml-2 hover:underline text-sm">{userData.email}</a>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <Phone className={`w-5 h-5 mr-3 ${theme.accentColor}`} />
                            <span className="font-semibold">Phone:</span>
                            <span className="ml-2 text-sm">{userData.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <MapPin className={`w-5 h-5 mr-3 ${theme.accentColor}`} />
                            <span className="font-semibold">Location:</span>
                            <span className="ml-2 text-sm">{userData.location}</span>
                        </div>
                    </div>

                    <div className="md:col-span-3 lg:col-span-2">
                        <p className={`text-lg leading-relaxed ${theme.textBase} mb-6 text-justify`}>{userData.about}</p>
                        
                        <a 
                            href="https://drive.google.com/uc?export=download&id=1Wli7qnYFHgsJtLJg94wpuVsy_wIEEtaL" 
                            download="Vejanand_Sindhiya_CV.pdf"
                            className={`inline-block px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${theme.accentBg} text-white shadow-xl hover:bg-amber-600`}
                        >
                            Download CV (PDF)
                        </a>
                    </div>
                </div>
            </div>
        </section>


        
        {/* Experience Section */}
        <section id="experience" className={`p-6 sm:p-12 max-w-7xl mx-auto mb-12`}>
            <div className={`${theme.secondaryBg} rounded-xl shadow-lg p-8 sm:p-12`}>
                <SectionTitle>Experience</SectionTitle>
                <div className="space-y-8">
                    {experience.map((exp) => (
                        <div key={exp.id} className="relative pl-8 sm:pl-16 pb-8">
                            <div className={`absolute left-0 sm:left-4 top-0 w-4 h-4 rounded-full ${theme.accentBg} shadow-lg ring-8 ring-white`}></div>
                            <div className="absolute left-[7px] sm:left-[19px] top-0 h-full w-0.5 bg-gray-300"></div>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 ml-4 sm:ml-0 transition duration-300 hover:shadow-lg">
                                <p className="text-sm font-semibold text-gray-500 mb-1">{exp.duration}</p>
                                <h3 className={`text-xl font-bold ${theme.textBase}`}>{exp.title}</h3>
                                <p className="text-md font-medium text-amber-600 mb-3">{exp.company}</p>
                                <p className="text-gray-600 mb-4">{exp.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="text-xs font-medium bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>



        {/* Skills Section */}
        <section id="skills" className={`p-6 sm:p-12 max-w-7xl mx-auto mb-12`}>
            <div className={`${theme.secondaryBg} rounded-xl shadow-lg p-8 sm:p-12`}>
                <SectionTitle>Skills & Expertise</SectionTitle>
                <div className="grid lg:grid-cols-2 gap-x-12 gap-y-8">
                    {skills.map((skill) => (
                        <div 
                          key={skill.id} 
                          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 p-6 border-l-4 border-gray-200 hover:border-amber-500 rounded-lg transition duration-300 hover:shadow-xl bg-gray-50"
                        >
                         
                            <div className={`w-16 h-16 flex-shrink-0 rounded-full ${skill.color} flex items-center justify-center text-white shadow-xl`}>
                                <skill.icon className="w-8 h-8" />
                            </div>

                            <div className="flex-grow">
                                <h3 className={`text-xl font-bold ${theme.textBase} mb-1`}>{skill.name}</h3>
                                <p className="text-md text-gray-600 leading-relaxed">
                                    {skill.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>


        {/* Projects Section */}
        <section id="projects" className={`p-6 sm:p-12 max-w-7xl mx-auto mb-12`}>
            <div className={`${theme.secondaryBg} rounded-xl shadow-lg p-8 sm:p-12`}>
                <SectionTitle>Projects</SectionTitle>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => {
                        const borderStyle = project.isOngoing ? 'border-sky-500' : 'border-amber-500';
                        const iconColor = project.isOngoing ? 'text-sky-500' : theme.accentColor;
                        
                        const ProjectCardContent = (
                            <div
                                className={`p-6 bg-gray-50 rounded-xl border-t-4 ${borderStyle} shadow-md transition-all duration-300 h-full flex flex-col`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <Briefcase className={`w-6 h-6 ${iconColor}`} />
                                    {project.isOngoing && (
                                        <span className="text-xs font-bold text-white bg-sky-500 px-3 py-1 rounded-full shadow-lg animate-pulse">
                                            In Progress
                                        </span>
                                    )}
                                    {project.link && !project.isOngoing && ( // Only show link icon for completed (non-ongoing) projects
                                        <Link className={`w-5 h-5 text-sky-500 transition-transform duration-300 hover:scale-110`} />
                                    )}
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${theme.textBase}`}>{project.title}</h3>
                                <p className="text-gray-600 mb-4 text-sm flex-grow">{project.description}</p>
                                <p className="text-xs font-medium text-gray-500 mb-3">Role: {project.role}</p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="text-xs font-medium bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );

                        return (
                            <div
                                key={project.id}
                                className={`transition-all duration-300 ${project.link ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer' : 'hover:shadow-lg'}`}
                            >
                                {project.link ? (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                                        {ProjectCardContent}
                                    </a>
                                ) : (
                                    ProjectCardContent
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className={`p-6 sm:p-12 max-w-7xl mx-auto mb-12`}>
            <div className={`${theme.secondaryBg} rounded-xl shadow-lg p-8 sm:p-12`}>
                <SectionTitle>Contact</SectionTitle>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <p className="text-lg text-gray-600 mb-6">I am currently available for new **MERN projects** and collaborations. Send me a message, and I'll respond within one business day.</p>
                        
                        <div className="flex items-center text-gray-700">
                            <Mail className={`w-5 h-5 mr-3 ${theme.accentColor}`} />
                            <a href={`mailto:${userData.email}`} className="text-base hover:underline font-medium">{userData.email}</a>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <Phone className={`w-5 h-5 mr-3 ${theme.accentColor}`} />
                            <span className="text-base font-medium">{userData.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <MapPin className={`w-5 h-5 mr-3 ${theme.accentColor}`} />
                            <span className="text-base font-medium">{userData.location}</span>
                        </div>
                    </div>

                    <div>
                        <form className="space-y-4 p-4 border border-gray-200 rounded-xl bg-gray-50" onSubmit={handleSubmit}>
                            <input
                              type="text"
                              name="name"
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                              required
                            />
                            <input
                              type="email"
                              name="email"
                              placeholder="Your Email"
                              value={formData.email}
                              onChange={handleChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
                              required
                            />
                            <textarea
                              name="message"
                              placeholder="Your Message"
                              rows="4"
                              value={formData.message}
                              onChange={handleChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150 resize-none"
                              required
                            ></textarea>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className={`px-8 py-3 font-semibold rounded-lg text-white transition duration-300 ease-in-out w-full
                                ${isSubmitting ? 'bg-amber-400 cursor-not-allowed' : `${theme.accentBg} hover:bg-amber-600`}
                              `}
                            >
                              {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                            
                            {status && (
                                <p className={`text-center pt-2 font-medium text-sm
                                    ${status.startsWith('Error') ? 'text-red-500' : status.startsWith('Success') ? 'text-green-600' : 'text-amber-600'}
                                `}>
                                    {status}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <footer className={`text-center py-10 mt-12 ${theme.primaryBg} text-gray-400 shadow-inner`}>
            <div className="flex justify-center space-x-4 mb-6">
                <SocialIcon icon={Linkedin} href={userData.socials.linkedin} label="LinkedIn" />
                <SocialIcon icon={Github} href={userData.socials.github} label="GitHub" />
                <SocialIcon icon={Twitter} href={userData.socials.twitter} label="Twitter" />
                <SocialIcon icon={Facebook} href={userData.socials.facebook} label="Facebook" />
            </div>
            <p className="text-sm">&copy; {new Date().getFullYear()} {userData.name}. All Rights Reserved. | MERN Specialist</p>
        </footer>

        {showScroll && (
          <button
            onClick={scrollToTop}
            className={`fixed bottom-10 right-10 p-3 rounded-full ${theme.accentBg} text-white shadow-xl hover:bg-amber-600 transition-all duration-300 z-50`}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </main>
      
      {/* Custom CSS for Animations */}
      <style>
        {`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes spin-slow-reverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow var(--animation-duration, 40s) linear infinite;
          }
          .animate-spin-slow-reverse {
            animation: spin-slow-reverse var(--animation-duration-reverse, 30s) linear infinite;
          }
          
          /* Ensures pulse effect works */
          @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: .5; }
          }
          .animate-pulse {
              animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          @media (min-width: 640px) {
            .sm\\:ml-20 {
              margin-left: 5rem; /* 80px */
            }
          }
        `}
      </style>
    </div>
  );
};

export default App;