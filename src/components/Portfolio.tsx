import React, { useState, useEffect, useMemo } from 'react';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Github, Download, ExternalLink, 
  Code2, Database, Server, Send, 
  Facebook, Twitter, Instagram, Phone,
  Terminal, Cpu, Globe, ArrowRight,
  Brain, Users, Zap, Rocket, Mail, 
  MessageSquare, User, FileText, MessageCircle,
  LayoutTemplate, AppWindow, DatabaseZap, CheckCircle, Sparkles
} from 'lucide-react';

// --- TYPES ---
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  image?: string;
}

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  stack: string[];
}

// --- DATA ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Habit-Tracker",
    category: "Full Stack",
    description: "Un site web qui aide les utilisateurs à créer, suivre et maintenir de bonnes habitudes au quotidien. Interface intuitive et statistiques détaillées.",
    tech: ["React", "TypeScript", "Node.js"],
    link: "#",
    github: "https://github.com/ninahouha-dev-tech/Habit-Tracker.git",
    image: "/images/1.png" 
  },
  {
    id: 2,
    title: "Todo App",
    category: "Productivité",
    description: "Une application de gestion de tâches minimaliste mais puissante. Support du drag-and-drop et mode sombre.",
    tech: ["React", "TypeScript", "Tailwind"],
    link: "#",
    github: "https://github.com/ninahouha-dev-tech/todo-app.git",
    image: "/images/2.png"
  },
  {
    id: 3,
    title: "BudgetPal",
    category: "Finance",
    description: "Tableau de bord financier permettant de suivre, organiser et analyser les dépenses avec des graphiques interactifs.",
    tech: ["React", "Node.js", "Chart.js"],
    link: "#",
    github: "https://github.com/ninahouha-dev-tech/budgetpal.git",
    image: "/images/6.png"
  },
];

const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Stagiaire",
    company: "TPAPY",
    period: "Juillet 2024",
    description: "Création d'application mobile multiplateformes.",
    stack: ["Flutter"]
  },
  {
    id: 2,
    role: "Stagiaire",
    company: "TPAPY",
    period: "Aout 2024",
    description: "Développement Python avec architecture MVC.",
    stack: ["Python"]
  },
  {
    id: 3,
    role: "Stagiaire",
    company: "TPAPY",
    period: "Septembre 2024",
    description: "Création d'application en Laravel avec API REST.",
    stack: ["Laravel"]
  },
  {
    id: 4,
    role: "Stagiaire",
    company: "2CL Services",
    period: "Février - Mai 2024",
    description: "Mise en place d'un système de supervision des ressources internes.",
    stack: ["React-Node.js"]
  }
];

const SKILLS_CATEGORIES = [
  {
    title: "Frontend & UI",
    icon: LayoutTemplate,
    description: "Interfaces réactives et pixel-perfect.",
    skills: ["JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "Tailwind CSS"]
  },
  {
    title: "Backend & API",
    icon: Server,
    description: "Logique serveur robuste et scalable.",
    skills: ["Node.js", "NestJS", "PHP / Laravel", "Python"]
  },
  {
    title: "Data & DevOps",
    icon: DatabaseZap,
    description: "Gestion des données et déploiement.",
    skills: ["MySQL", "Git/GitHub", "Docker", "CI/CD"]
  }
];

const DYNAMIC_FORM_DATA = {
  projectTypes: [
    {
      id: "web",
      label: "Développement Web",
      categories: [
        {
          id: "vitrine",
          label: "Site Vitrine",
          techs: ["React.js", "Next.js", "HTML5 / Tailwind CSS", "Astro"]
        },
        {
          id: "ecommerce",
          label: "E-commerce & Boutique",
          techs: ["Shopify", "WooCommerce", "Prestashop", "Custom React / Stripe"]
        },
        {
          id: "saas",
          label: "SaaS & Dashboard",
          techs: ["React / Node.js", "Next.js / Supabase", "PHP / Laravel", "Python / Django"]
        },
        {
          id: "blog",
          label: "Blog / Portfolio",
          techs: ["WordPress", "Gatsby", "Next.js (CMS Headless)"]
        }
      ]
    },
    {
      id: "mobile",
      label: "Applications Mobiles",
      categories: [
        {
          id: "ios_android",
          label: "iOS & Android (Hybride)",
          techs: ["React Native", "Flutter", "Ionic"]
        },
        {
          id: "pwa",
          label: "PWA (Progressive Web App)",
          techs: ["React / Vite", "Next.js"]
        }
      ]
    },
    {
      id: "design",
      label: "Design & Identité Visuelle",
      categories: [
        {
          id: "uiux",
          label: "UX / UI Design",
          techs: ["Figma", "Adobe XD", "Sketch"]
        },
        {
          id: "branding",
          label: "Branding & Logo",
          techs: ["Adobe Illustrator", "Canva Pro"]
        }
      ]
    },
    {
      id: "maintenance",
      label: "Maintenance & Support",
      categories: [
        {
          id: "bugfix",
          label: "Correction de Bugs",
          techs: ["Audit de Code", "Débogage API", "Optimisation Performance"]
        },
        {
          id: "migration",
          label: "Migration / Mise à jour",
          techs: ["Mise à jour Version", "Migration Cloud", "Refactorisation"]
        }
      ]
    }
  ],
  budgetRanges: [
    { id: "v_small", label: "Moins de 250 000 FCFA" },
    { id: "small", label: "250 000 FCFA - 750 000 FCFA" },
    { id: "medium", label: "750 000 FCFA - 2 000 000 FCFA" },
    { id: "large", label: "2 000 000 FCFA - 5 000 000 FCFA" },
    { id: "v_large", label: "Plus de 5 000 000 FCFA" }
  ]
};

// --- COMPONENTS ---

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-4 mb-12">
    <div className="h-10 w-1.5 bg-gradient-to-b from-orange-500 to-purple-600 rounded-full"></div>
    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
      {children}
    </h2>
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  type = "button",
  icon: Icon 
}: { 
  children: React.ReactNode, 
  onClick?: () => void, 
  variant?: "primary" | "outline", 
  type?: "button" | "submit",
  icon?: React.ElementType 
}) => {
  const baseStyle = "w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group text-sm tracking-wide";
  const variants = {
    primary: "bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:-translate-y-0.5",
    outline: "border border-white/20 text-white hover:border-orange-500 hover:text-orange-500 hover:bg-white/5"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {children}
      {Icon && <Icon size={18} className="group-hover:translate-x-1 transition-transform" />}
    </button>
  );
};

// --- MAIN PORTFOLIO ---

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typingText, setTypingText] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  const [formState, setFormState] = useState({ 
    name: '', 
    email: '', 
    location: '', 
    projectType: '', 
    category: '', 
    technology: '',
    budget: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const steps = useMemo(() => [
    { id: 'personal', fields: ['name', 'location', 'email'] },
    { id: 'type', fields: ['projectType'] },
    { id: 'category', fields: ['category'] },
    { id: 'technology', fields: ['technology'] },
    { id: 'budget', fields: ['budget'] }
  ], []);

  const progress = useMemo(() => {
    const totalFields = 7;
    const filledFields = Object.values(formState).filter(val => val !== '').length;
    return Math.round((filledFields / totalFields) * 100);
  }, [formState]);

  const canShowStep = (stepId: string) => {
    if (stepId === 'personal') return true;
    if (stepId === 'type') return formState.name && formState.location && formState.email;
    if (stepId === 'category') return formState.projectType;
    if (stepId === 'technology') return formState.category;
    if (stepId === 'budget') return formState.technology;
    return false;
  };

  const isFormComplete = Object.values(formState).every(val => val !== '');

  const handleFieldChange = (field: string, value: string) => {
    setFormState(prev => {
      const newState = { ...prev, [field]: value };
      
      // Reset dependent fields
      if (field === 'projectType') {
        newState.category = '';
        newState.technology = '';
        newState.budget = '';
      } else if (field === 'category') {
        newState.technology = '';
        newState.budget = '';
      } else if (field === 'technology') {
        newState.budget = '';
      }
      
      return newState;
    });
  };
  
  const fullText = "Développeuse Full-Stack";
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypingText(fullText.slice(0, index + 1));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    const serviceID = 'service_0t5mv3d';
    const templateID = 'template_98m7ifo';
    const publicKey = 'ew7U17dMgFu6lFUM-';

    const templateParams = {
      from_name: formState.name,
      from_email: formState.email,
      location: formState.location,
      project_type: formState.projectType,
      category: formState.category,
      technology: formState.technology,
      budget: formState.budget,
      subject: `Nouveau projet: ${formState.projectType}`,
      message: `Nom: ${formState.name}\nEmail: ${formState.email}\nLieu: ${formState.location}\nType: ${formState.projectType}\nCatégorie: ${formState.category}\nTechno: ${formState.technology}\nBudget: ${formState.budget}`,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response: EmailJSResponseStatus) => {
        setStatus('success');
        setFormState({ name: '', email: '', location: '', projectType: '', category: '', technology: '', budget: '' });
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch((err: Error) => {
        console.error('FAILED...', err);
        setStatus('error');
      });
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/nina.pdf';
    link.download = 'nina.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#1a0b2e] text-slate-200 font-sans selection:bg-orange-500/30 selection:text-orange-200 overflow-x-hidden">
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-0 md:p-6 pointer-events-none">
        <header 
          className={`
            pointer-events-auto w-full md:max-w-6xl transition-all duration-300
            ${scrolled || isMenuOpen ? 'bg-[#1a0b2e]/95 border-b md:border border-white/10 shadow-2xl backdrop-blur-xl' : 'bg-transparent border-transparent'}
            ${isMenuOpen ? 'rounded-none h-screen' : 'md:rounded-2xl max-w-[95%] md:max-w-6xl'}
          `}
        >
          <div className="px-6 h-20 flex justify-between items-center">
            <div onClick={() => scrollTo('home')} className="text-xl font-bold text-white cursor-pointer flex items-center gap-2 group select-none">
              <div className="bg-gradient-to-br from-orange-500 to-purple-600 p-1.5 rounded-lg">
                <Terminal className="text-white" size={20} />
              </div>
              <span className="tracking-tight">Nina<span className="text-orange-500">.Dev</span></span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {['Accueil', 'À propos', 'Compétences', 'Projets', 'Expérience'].map((item, idx) => {
                const id = ['home', 'about', 'skills', 'projects', 'experience'][idx];
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                  >
                    {item}
                  </button>
                );
              })}
              <div className="ml-4 pl-4 border-l border-white/10">
                 <button onClick={() => scrollTo('contact')} className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95">Me contacter</button>
              </div>
            </nav>

            <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 w-full h-[calc(100vh-80px)] bg-[#1a0b2e] p-6 flex flex-col gap-2 overflow-y-auto">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((id) => (
                <button key={id} onClick={() => scrollTo(id)} className="text-left p-4 rounded-xl text-lg font-medium text-slate-300 hover:bg-white/5 hover:text-orange-500 transition-colors border-b border-white/5 last:border-0 capitalize">
                  {id === 'home' ? 'Accueil' : id === 'about' ? 'À propos' : id === 'skills' ? 'Compétences' : id === 'projects' ? 'Projets' : id === 'experience' ? 'Expérience' : 'Contact'}
                </button>
              ))}
            </div>
          )}
        </header>
      </div>

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center pt-20 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0b2e]/50 to-[#1a0b2e] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 w-full">
          <div className="space-y-8 text-center md:text-left order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-slate-300 text-xs font-semibold tracking-wide uppercase">Disponible pour mission</span>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg md:text-xl text-orange-500 font-medium tracking-wide">Bonjour, je suis Nina</h2>
              <h1 className="text-4xl xs:text-5xl lg:text-7xl font-bold text-white leading-[1.1]">
                <span className="block min-h-[1.2em]">{typingText}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500">Passionnée</span>
              </h1>
            </div>
            
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              Je conçois des architectures web robustes et des interfaces intuitives. Transformons vos idées complexes en solutions numériques performantes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-2">
              <Button onClick={() => scrollTo('contact')} variant="primary" icon={ArrowRight}>Me contacter</Button>
              <Button onClick={handleDownloadCV} variant="outline" icon={Download}>Télécharger CV</Button>
            </div>
          </div>
          
          <div className="flex justify-center relative order-1 md:order-2 mb-12 md:mb-0">
            <div className="relative w-64 h-72 xs:w-72 xs:h-80 md:w-80 md:h-[400px] lg:w-96 lg:h-[450px] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-transparent opacity-20 rounded-[2rem] transform rotate-3 md:rotate-6 border border-orange-500/30 transition-transform group-hover:rotate-12 duration-700 ease-out"></div>
              <div className="absolute inset-0 bg-[#0f0518] rounded-[2rem] transform -rotate-2 md:-rotate-3 border border-white/5 shadow-2xl transition-transform group-hover:-rotate-6 duration-700 ease-out"></div>
              <div className="absolute inset-2 bg-slate-800 rounded-[1.5rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 z-10">
                <img src="/images/1.jpg" alt="Nina" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION À PROPOS (NOUVELLE VERSION PREMIUM) */}
      <section id="about" className="py-20 bg-[#150925] relative overflow-hidden">
        {/* Arrière-plan décoratif global */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* --- NOUVEAU DESIGN DE CARTE PHOTO --- */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end order-1">
              <div className="relative w-full max-w-sm group perspective-1000">
                
                {/* 1. Glow arrière (Lueur) */}
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                
                {/* 2. Conteneur principal de la carte */}
                <div className="relative h-[400px] xs:h-[480px] w-full bg-[#1a0b2e] rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl">
                  
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img 
                      src="/images/2.jpg" 
                      alt="Nina Tatiana" 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                    />
                    {/* Overlay dégradé pour lisibilité du texte en bas */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] via-[#0f0518]/20 to-transparent opacity-90"></div>
                  </div>

                  {/* Éléments décoratifs sur l'image */}
                  <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                    <Code2 className="text-orange-400 w-5 h-5" />
                  </div>

                  {/* Contenu info (Bas de carte) */}
                  <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    
                    {/* Badge Status */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 backdrop-blur-md mb-4">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-orange-200 text-xs font-bold uppercase tracking-wider">Open to Work</span>
                    </div>

                    {/* Nom et Titre */}
                    <h3 className="text-3xl font-bold text-white mb-1">Nina <span className="text-orange-500">.Dev</span></h3>
                    <p className="text-slate-300 text-sm font-medium mb-4">Full-Stack Developer</p>
                    
                    {/* Stats / Tech rapides */}
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                       <div className="text-center">
                          <p className="text-white font-bold">3+</p>
                          <p className="text-[10px] text-slate-400 uppercase">Projets</p>
                       </div>
                       <div className="w-px bg-white/10 h-8"></div>
                       <div className="text-center">
                          <p className="text-white font-bold">1+</p>
                          <p className="text-[10px] text-slate-400 uppercase">Expérience</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Élément décoratif arrière (Grille de points) */}
                <div className="absolute -z-10 -bottom-6 -right-6 w-24 h-24 bg-[radial-gradient(#ea580c_1px,transparent_1px)] [background-size:8px_8px] opacity-50"></div>
              </div>
            </div>

            {/* Contenu Texte */}
            <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-10 order-2">
              <SectionTitle>À Propos</SectionTitle>
              
              <div className="space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Je transforme des concepts complexes en <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-500">solutions digitales performantes.</span>
                </h3>
                
                <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                  <p>
                    Bonjour ! Je suis <strong className="text-white">Nina</strong>. Mon approche du développement web allie rigueur technique et créativité visuelle.
                  </p>
                  <p>
                    Spécialisée dans l'écosystème <strong className="text-orange-400">React & Next.js</strong>, je ne me contente pas d'écrire du code : je conçois des architectures maintenables, des interfaces intuitives et des expériences utilisateur fluides.
                  </p>
                </div>
              </div>

              {/* Grille des Soft Skills améliorée */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                {[
                  { icon: Brain, label: "Résolution de problèmes", desc: "Approche analytique et logique" },
                  { icon: Rocket, label: "Performance", desc: "Code optimisé et rapide" },
                  { icon: Users, label: "Travail d'équipe", desc: "Communication claire et efficace" },
                  { icon: Sparkles, label: "Sensibilité UI/UX", desc: "Souci du détail visuel" },
                ].map((skill, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-[#1e1136]/50 border border-white/5 hover:bg-[#1e1136] hover:border-orange-500/20 transition-all group">
                    <div className="p-2.5 bg-orange-500/10 rounded-lg text-orange-500 group-hover:scale-110 transition-transform mt-1">
                      <skill.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">{skill.label}</h4>
                      <p className="text-slate-500 text-xs mt-1">{skill.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#150925] via-[#1a0b2e] to-[#150925] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitle>Compétences Techniques</SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-8">
            {SKILLS_CATEGORIES.map((category, idx) => (
              <div key={idx} className="group relative bg-[#1e1136] border border-white/5 rounded-2xl p-8 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                  <category.icon size={80} className="text-white transform rotate-12 translate-x-4 -translate-y-4" />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
                    <category.icon size={24} className="text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 min-h-[2.5rem]">{category.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-orange-200/80 hover:bg-white/10 hover:text-white transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-16 bg-[#150925] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 flex justify-between items-end">
            <SectionTitle>Réalisations</SectionTitle>
            <div className="hidden md:flex gap-2 text-slate-500 text-sm pb-12">
               <span>Scroll</span>
               <ArrowRight size={16} className="animate-pulse" />
            </div>
          </div>
          
          {/* SLIDER HORIZONTAL */}
          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
              
              {PROJECTS.map((project) => (
                <div key={project.id} className="snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-[400px] bg-[#1e1136] border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col group">
                  
                  <div className="relative h-48 md:h-56 bg-slate-800 overflow-hidden">
                    <img 
                      src={project.image || `/api/placeholder/400/320?text=${project.title}`} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1e1136/FFF?text=${project.title}`;
                      }}
                    />
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#1a0b2e]/90 text-orange-400 text-xs font-bold rounded-full border border-orange-500/20 shadow-lg backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-[#1a0b2e]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                       <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:bg-orange-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300" title="Voir le Code">
                         <Github size={20}/>
                       </a>
                       <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:bg-orange-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75" title="Visiter le site">
                         <ExternalLink size={20}/>
                       </a>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-xs font-medium text-slate-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="snap-center shrink-0 w-[85vw] sm:w-[300px] flex items-center justify-center">
                 <a 
                   href="https://github.com/ninahouha-dev-tech" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-full h-full min-h-[350px] bg-[#1e1136]/50 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group cursor-pointer"
                 >
                   <div className="p-5 bg-white/5 rounded-full group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                     <Github size={40} />
                   </div>
                   <div className="text-center">
                     <span className="font-bold text-lg block">Voir plus sur GitHub</span>
                     <span className="text-xs text-slate-500 group-hover:text-orange-400/70 mt-1">Découvrir tous mes repos</span>
                   </div>
                 </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle>Parcours Professionnel</SectionTitle>
          <div className="space-y-8 max-w-4xl mx-auto">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative pl-8 md:pl-0">
                <div className="md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-white/10"></div>
                <div className="md:flex gap-8 group">
                  <div className="hidden md:flex flex-col items-end w-48 shrink-0 pt-1">
                    <span className="text-orange-500 font-bold">{exp.period}</span>
                    <span className="text-slate-500 text-sm">{exp.company}</span>
                  </div>
                  <div className="hidden md:block w-0.5 bg-white/10 relative">
                    <div className="absolute top-2 -left-[5px] w-3 h-3 bg-orange-500 rounded-full ring-4 ring-[#1a0b2e] group-hover:scale-125 transition-transform"></div>
                  </div>
                  <div className="flex-1 bg-[#1e1136] p-6 rounded-xl border border-white/5 hover:border-orange-500/30 transition-all duration-300">
                    <div className="md:hidden mb-2">
                       <span className="text-orange-500 text-sm font-bold block">{exp.period}</span>
                       <span className="text-slate-400 text-xs">{exp.company}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{exp.role}</h3>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.stack.map(tech => (
                        <span key={tech} className="text-xs text-orange-300/80 bg-orange-500/5 px-2 py-1 rounded border border-orange-500/10">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION CONTACT */}
      <section id="contact" className="py-20 bg-[#150925] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#150925] to-[#150925] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <SectionTitle>Me Contacter</SectionTitle>
          
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-purple-600 to-orange-500 rounded-[2rem] opacity-30 blur-sm animate-pulse"></div>
            
            <div className="relative bg-[#0f0518] rounded-[1.8rem] overflow-hidden border border-white/10 shadow-2xl">
              
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5 bg-[#1e1136]/50">
                <a href="mailto:houhatatiana@gmail.com" className="flex items-center justify-center gap-3 p-6 hover:bg-white/5 transition-colors group text-center break-all">
                  <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 group-hover:scale-110 transition-transform shrink-0">
                    <Mail size={20} />
                  </div>
                  <span className="text-slate-300 font-medium group-hover:text-white transition-colors text-sm sm:text-base">houhatatiana@gmail.com</span>
                </a>
                <a href="tel:+1234567890" className="flex items-center justify-center gap-3 p-6 hover:bg-white/5 transition-colors group">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <span className="text-slate-300 font-medium group-hover:text-white transition-colors">+229 54405220</span>
                </a>
              </div>

              <div className="p-8 md:p-12">
                {/* Dynamically update the progress bar */}
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">Progression de votre demande</span>
                    <span className="text-xs font-bold text-white">{progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-orange-600 to-orange-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
                  {/* STEP 1: Personal Info */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="group relative">
                      <input 
                        type="text" 
                        required
                        className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white focus:outline-none focus:border-orange-500 transition-all placeholder-transparent peer"
                        placeholder="Nom / Raison sociale"
                        id="name"
                        value={formState.name}
                        onChange={e => handleFieldChange('name', e.target.value)}
                      />
                      <label htmlFor="name" className="absolute left-0 top-3 text-slate-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-orange-500 peer-valid:-top-5 peer-valid:text-xs">Nom / Raison sociale</label>
                    </div>

                    <div className="group relative">
                      <input 
                        type="text" 
                        required
                        className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white focus:outline-none focus:border-orange-500 transition-all placeholder-transparent peer"
                        placeholder="Lieu de résidence"
                        id="location"
                        value={formState.location}
                        onChange={e => handleFieldChange('location', e.target.value)}
                      />
                      <label htmlFor="location" className="absolute left-0 top-3 text-slate-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-orange-500 peer-valid:-top-5 peer-valid:text-xs">Lieu de résidence / Siège</label>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="group relative">
                      <input 
                        type="email" 
                        required
                        className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white focus:outline-none focus:border-orange-500 transition-all placeholder-transparent peer"
                        placeholder="Email"
                        id="email"
                        value={formState.email}
                        onChange={e => handleFieldChange('email', e.target.value)}
                      />
                      <label htmlFor="email" className="absolute left-0 top-3 text-slate-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-orange-500 peer-valid:-top-5 peer-valid:text-xs">Email professionnel</label>
                    </div>

                    <AnimatePresence>
                      {canShowStep('type') && (
                        <motion.div 
                          className="group relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <select 
                            required
                            className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white focus:outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer"
                            id="projectType"
                            value={formState.projectType}
                            onChange={e => handleFieldChange('projectType', e.target.value)}
                          >
                            <option value="" disabled hidden className="bg-[#0f0518]">Type de projet</option>
                            {DYNAMIC_FORM_DATA.projectTypes.map(type => (
                              <option key={type.id} value={type.id} className="bg-[#0f0518]">{type.label}</option>
                            ))}
                          </select>
                          <label htmlFor="projectType" className={`absolute left-0 -top-5 text-xs ${formState.projectType ? 'text-orange-500' : 'text-slate-500'} transition-all`}>Type de projet</label>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <AnimatePresence>
                      {canShowStep('category') && (
                        <motion.div 
                          className="group relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <select 
                            required
                            className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white focus:outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer"
                            id="category"
                            value={formState.category}
                            onChange={e => handleFieldChange('category', e.target.value)}
                          >
                            <option value="" disabled hidden className="bg-[#0f0518]">Catégorie</option>
                            {DYNAMIC_FORM_DATA.projectTypes.find(t => t.id === formState.projectType)?.categories.map(cat => (
                              <option key={cat.id} value={cat.id} className="bg-[#0f0518]">{cat.label}</option>
                            ))}
                          </select>
                          <label htmlFor="category" className={`absolute left-0 -top-5 text-xs ${formState.category ? 'text-orange-500' : 'text-slate-500'} transition-all`}>Catégorie</label>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {canShowStep('technology') && (
                        <motion.div 
                          className="group relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <select 
                            required
                            className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white focus:outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer"
                            id="technology"
                            value={formState.technology}
                            onChange={e => handleFieldChange('technology', e.target.value)}
                          >
                            <option value="" disabled hidden className="bg-[#0f0518]">Technologie</option>
                            {DYNAMIC_FORM_DATA.projectTypes.find(t => t.id === formState.projectType)?.categories.find(c => c.id === formState.category)?.techs.map(tech => (
                              <option key={tech} value={tech} className="bg-[#0f0518]">{tech}</option>
                            ))}
                          </select>
                          <label htmlFor="technology" className={`absolute left-0 -top-5 text-xs ${formState.technology ? 'text-orange-500' : 'text-slate-500'} transition-all`}>Technologie</label>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {canShowStep('budget') && (
                        <motion.div 
                          className="group relative"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                        >
                          <select 
                            required
                            className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white focus:outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer"
                            id="budget"
                            value={formState.budget}
                            onChange={e => handleFieldChange('budget', e.target.value)}
                          >
                            <option value="" disabled hidden className="bg-[#0f0518]">Fourchette de Budget</option>
                            {DYNAMIC_FORM_DATA.budgetRanges.map(range => (
                              <option key={range.id} value={range.label} className="bg-[#0f0518]">{range.label}</option>
                            ))}
                          </select>
                          <label htmlFor="budget" className={`absolute left-0 -top-5 text-xs ${formState.budget ? 'text-orange-500' : 'text-slate-500'} transition-all`}>Budget prévu</label>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* CONCLUSION & SUBMIT */}
                  <AnimatePresence>
                    {isFormComplete && (
                      <motion.div 
                        className="pt-4 space-y-6"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h4 className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-4">Récapitulatif de votre demande</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-500 mb-1">Cible</p>
                              <p className="text-white font-medium">{formState.name} ({formState.location})</p>
                            </div>
                            <div>
                              <p className="text-slate-500 mb-1">Projet</p>
                              <p className="text-white font-medium">{DYNAMIC_FORM_DATA.projectTypes.find(t => t.id === formState.projectType)?.label}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 mb-1">Spécification</p>
                              <p className="text-white font-medium">{formState.technology} ({formState.category})</p>
                            </div>
                            <div>
                              <p className="text-slate-500 mb-1">Budget</p>
                              <p className="text-white font-medium">{formState.budget}</p>
                            </div>
                          </div>
                        </div>

                        {status === 'success' && (
                          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400">
                            <CheckCircle size={20} />
                            <span>Demande envoyée avec succès ! Je reviens vers vous rapidement.</span>
                          </div>
                        )}
                        
                        <button 
                          type="submit" 
                          disabled={status === 'sending' || status === 'success'}
                          className={`w-full font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-all group ${status === 'sending' ? 'bg-slate-700 cursor-not-allowed' : 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white'}`}
                        >
                          {status === 'sending' ? 'Envoi...' : <><span>Confirmer et envoyer ma demande</span><Send size={18} /></>}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0f0518] py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm text-center md:text-left">© {new Date().getFullYear()} Nina HOUHA. Code with <span className="text-orange-500">React</span> & <span className="text-orange-500">Tailwind</span>.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><MessageCircle size={20} /></a>
            <a href="#" className="text-slate-500 hover:text-blue-600 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="text-slate-500 hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;