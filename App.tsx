
import React, { useState } from 'react';
import { 
  DollarSign, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Heart, 
  Palette,
  HandHeart,
  X,
  Printer,
  Mail,
  CheckCircle2,
  User,
  Building2,
  RotateCcw,
  MessageSquare,
  Send,
  FileText,
  Lock
} from 'lucide-react';

// --- Types ---
type OnboardingStep = 'IDENTIFY' | 'WELCOME' | 'AGREEMENT' | 'SUCCESS';
type LegalModalType = 'PRIVACY' | 'TERMS' | null;

interface UserData {
  name: string;
  businessName: string;
  signature: string;
}

// --- Helper Components ---

const Section = ({ children, className = "", id = "" }: { children?: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-16 md:py-24 px-6 md:px-12 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
);

const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const dimensions = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-32 h-32 md:w-40 md:h-40"
  };
  return (
    <div className={`${dimensions[size]} rounded-full overflow-hidden shadow-2xl border-2 border-white/50 flex-shrink-0 bg-stone-900 relative`}>
      <img 
        src="https://i.imgur.com/97pR8zg.png" 
        alt="Brush of Light Logo" 
        className="w-full h-full object-cover scale-110"
      />
    </div>
  );
};

const BenefitCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 transition-all hover:shadow-md hover:-translate-y-1">
    <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-6 text-amber-700">
      <Icon size={24} />
    </div>
    <h3 className="text-2xl font-semibold mb-3">{title}</h3>
    <p className="text-stone-600 leading-relaxed">{description}</p>
  </div>
);

// --- Legal Modals ---

const LegalModal = ({ type, onClose }: { type: LegalModalType, onClose: () => void }) => {
  if (!type) return null;

  const content = type === 'PRIVACY' ? {
    title: "Privacy Policy",
    icon: <Lock className="text-amber-600" />,
    text: (
      <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
        <p><strong>Last Updated: May 2024</strong></p>
        <p>At Ezelle Art LLC, we are committed to protecting the privacy of our funeral service partners and their clients. This policy outlines how we handle data.</p>
        <h4 className="font-bold text-stone-800">1. Data Collection</h4>
        <p>We collect information provided voluntarily through our contact forms, including names, business emails, and business entities. This is used solely for the purpose of establishing and managing partnership agreements.</p>
        <h4 className="font-bold text-stone-800">2. Professional Confidentiality</h4>
        <p>Information regarding deceased individuals or bereaved families shared for the purpose of creating memorial art is treated with the highest level of professional sanctity and confidentiality.</p>
        <h4 className="font-bold text-stone-800">3. Third-Party Sharing</h4>
        <p>We do not sell or trade your personal or business data to outside parties. Data is only shared when necessary to fulfill the services requested (e.g., shipping art).</p>
      </div>
    )
  } : {
    title: "Terms and Conditions",
    icon: <FileText className="text-amber-600" />,
    text: (
      <div className="space-y-4 text-stone-600 text-sm leading-relaxed">
        <p><strong>General Agreement Terms</strong></p>
        <p>By using this site or inquiring about our services, you agree to the following professional terms of engagement with Ezelle Art LLC.</p>
        <h4 className="font-bold text-stone-800">1. Intellectual Property</h4>
        <p>All brand assets, including the "Brush of Light" name and methodology, are the sole intellectual property of Ezelle Art LLC. Unauthorized reproduction is prohibited.</p>
        <h4 className="font-bold text-stone-800">2. Professional Conduct</h4>
        <p>Partners agree to maintain a standard of excellence and respect when presenting Brush of Light services to bereaved families, upholding the reputation of the funeral industry.</p>
        <h4 className="font-bold text-stone-800">3. Liability</h4>
        <p>Ezelle Art LLC provides artistic services and is not liable for structural or operational changes within the partner's funeral home or facility.</p>
      </div>
    )
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 no-print">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {content.icon}
            <h2 className="text-xl font-bold serif text-stone-800">{content.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-8 overflow-y-auto">
          {content.text}
        </div>
        <div className="p-6 border-t border-stone-100 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium">Close</button>
        </div>
      </div>
    </div>
  );
};

// --- Contact Portal Component ---

const ContactPortal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', business: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry for Brush of Light - ${formData.business}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nBusiness: ${formData.business}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:ezelle@ezelleart.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10 no-print">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 md:px-10 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-2xl font-bold serif text-stone-800">Contact Ezelle Art LLC</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 md:p-10 overflow-y-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Your Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-amber-500/20"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Business Email</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-amber-500/20"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Business Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-amber-500/20"
                  value={formData.business}
                  onChange={e => setFormData({...formData, business: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Your Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-amber-500/20 resize-none"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2">
                <Send size={18} />
                Send Inquiry to Ezelle
              </button>
            </form>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold serif mb-4">Message Initiated</h3>
              <p className="text-stone-600 mb-8">Your email client has been opened to complete the request. We look forward to connecting!</p>
              <button onClick={onClose} className="text-amber-700 font-bold uppercase text-xs tracking-widest">Close Window</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Onboarding Portal Component ---

const OnboardingPortal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState<OnboardingStep>('IDENTIFY');
  const [userData, setUserData] = useState<UserData>({ name: '', businessName: '', signature: '' });

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setUserData({ name: '', businessName: '', signature: '' });
    setStep('IDENTIFY');
  };

  const handleEmailPrompt = () => {
    const subject = encodeURIComponent(`Signed Partnership Agreement - ${userData.businessName}`);
    const body = encodeURIComponent(`Hi Ezelle,\n\nPlease find the signed partnership agreement for ${userData.businessName} attached to this email.\n\nBest regards,\n${userData.name}`);
    window.location.href = `mailto:ezelle@ezelleart.com?subject=${subject}&body=${body}`;
  };

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-md" onClick={step === 'SUCCESS' ? onClose : undefined} />
      <div className="relative bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
        <div className="p-6 md:px-10 border-b border-stone-100 flex items-center justify-between no-print">
          <h2 className="text-2xl font-bold serif text-stone-800">Partnership Agreement</h2>
          {step === 'SUCCESS' && (
            <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
              <X size={24} />
            </button>
          )}
        </div>

        <div className="overflow-y-auto flex-1">
          {step === 'IDENTIFY' && (
            <div className="p-8 md:p-10 space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold serif mb-3">Welcome, Partner</h3>
                <p className="text-stone-600">Please provide your details to begin the partnership process.</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Your Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-amber-500/20"
                    value={userData.name}
                    onChange={e => setUserData({...userData, name: e.target.value})}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Funeral Home / Business Name</label>
                  <input
                    type="text"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-amber-500/20"
                    value={userData.businessName}
                    onChange={e => setUserData({...userData, businessName: e.target.value})}
                    placeholder="Smith Family Funeral Home"
                  />
                </div>
                <button
                  onClick={() => setStep('WELCOME')}
                  disabled={!userData.name || !userData.businessName}
                  className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {step === 'WELCOME' && (
            <div className="p-8 md:p-10 space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold serif mb-3">Welcome, {userData.name}</h3>
                <p className="text-lg text-stone-600">from <span className="font-semibold">{userData.businessName}</span></p>
              </div>
              <div className="prose prose-stone max-w-none space-y-4 text-stone-600">
                <p>Thank you for your interest in partnering with Brush of Light by Ezelle Art LLC.</p>
                <p>We are honored to work alongside funeral service professionals like yourself who understand the profound importance of meaningful memorial art in the healing journey.</p>
                <p className="font-semibold text-stone-800">This partnership will enable you to offer families a truly unique way to honor their loved ones through custom memorial paintings.</p>
              </div>
              <button
                onClick={() => setStep('AGREEMENT')}
                className="w-full bg-stone-900 text-white font-bold py-4 rounded-xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
              >
                Review Agreement
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {step === 'AGREEMENT' && (
            <div className="p-8 md:p-10 space-y-6">
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold serif mb-4 text-amber-900">Partnership Agreement Terms</h3>
                <div className="prose prose-sm max-w-none space-y-4 text-stone-700">
                  <p><strong>This agreement</strong> is entered into between <strong>Ezelle Art LLC</strong> ("Provider") and <strong>{userData.businessName}</strong> ("Partner").</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-stone-900">1. Services Provided</h4>
                      <p>Provider agrees to create custom memorial art ("Brush of Light" pieces) based on photographs and details supplied by Partner on behalf of bereaved families.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-stone-900">2. Revenue Sharing</h4>
                      <p>Partner will receive a 20% commission on each completed memorial artwork sale facilitated through their funeral home.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-stone-900">3. Brand Integrity</h4>
                      <p>Partner agrees to represent the "Brush of Light" service with professionalism and compassion, maintaining the reputation standards of both parties.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-stone-900">4. Confidentiality</h4>
                      <p>All client information and photographs shared for the purpose of creating memorial art will be treated with strict confidentiality and destroyed after completion.</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-stone-900">5. Marketing Materials</h4>
                      <p>Provider will supply Partner with professional marketing materials, sample images, and display easels to present the service to families.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Your Digital Signature</label>
                  <input
                    type="text"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-amber-500/20 font-serif text-2xl"
                    value={userData.signature}
                    onChange={e => setUserData({...userData, signature: e.target.value})}
                    placeholder="Type your name"
                  />
                  <p className="text-xs text-stone-500 mt-2">By typing your name, you agree to the terms outlined above.</p>
                </div>
                <button
                  onClick={() => setStep('SUCCESS')}
                  disabled={!userData.signature}
                  className="w-full bg-amber-600 text-white font-bold py-4 rounded-xl hover:bg-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  Sign Agreement
                </button>
              </div>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="p-8 md:p-10">
              <div className="print:block">
                <div className="text-center mb-8 no-print">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold serif mb-3">Agreement Signed</h3>
                  <p className="text-stone-600">Thank you for joining the Brush of Light family!</p>
                </div>

                <div className="bg-white border-2 border-stone-200 rounded-2xl p-8 mb-8 print:border-stone-400">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold serif mb-2">Partnership Agreement</h2>
                    <p className="text-sm text-stone-600">Brush of Light by Ezelle Art LLC</p>
                    <p className="text-xs text-stone-500 mt-2">{today}</p>
                  </div>

                  <div className="space-y-6 text-sm">
                    <div className="grid grid-cols-2 gap-4 pb-6 border-b border-stone-200">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Partner Name</p>
                        <p className="font-semibold">{userData.name}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-1">Business Name</p>
                        <p className="font-semibold">{userData.businessName}</p>
                      </div>
                    </div>

                    <div className="pb-6 border-b border-stone-200">
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Agreement Summary</p>
                      <p className="text-stone-700 leading-relaxed">
                        {userData.businessName} has entered into a partnership agreement with Ezelle Art LLC to offer "Brush of Light" memorial art services.
                        Partner will receive 20% commission on completed sales and agrees to maintain brand integrity and client confidentiality.
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Digital Signature</p>
                      <p className="font-serif text-3xl text-stone-800">{userData.signature}</p>
                      <p className="text-xs text-stone-500 mt-1">Signed on {today}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 no-print">
                  <button
                    onClick={handlePrint}
                    className="flex-1 bg-stone-900 text-white font-bold py-4 rounded-xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
                  >
                    <Printer size={20} />
                    Print Copy
                  </button>
                  <button
                    onClick={handleEmailPrompt}
                    className="flex-1 bg-amber-600 text-white font-bold py-4 rounded-xl hover:bg-amber-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Mail size={20} />
                    Email to Ezelle
                  </button>
                </div>

                <div className="mt-6 no-print">
                  <button
                    onClick={handleReset}
                    className="w-full text-stone-500 text-sm font-medium py-3 hover:text-stone-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} />
                    Start New Agreement
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100">

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo size="sm" />
              <div>
                <h1 className="text-xl font-bold serif">Brush of Light</h1>
                <p className="text-xs text-stone-500">by Ezelle Art LLC</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setContactOpen(true)}
                className="px-4 py-2 text-sm font-bold text-stone-700 hover:text-stone-900 transition-colors flex items-center gap-2"
              >
                <MessageSquare size={16} />
                Contact
              </button>
              <button
                onClick={() => setOnboardingOpen(true)}
                className="px-6 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-stone-800 transition-all shadow-sm flex items-center gap-2"
              >
                <HandHeart size={16} />
                Become a Partner
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <Section className="pt-32 pb-20 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=1920)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </div>
          <div className="relative z-10 text-center">
            <Logo size="lg" />
            <h1 className="text-5xl md:text-7xl font-bold serif mt-8 mb-6 leading-tight">
              Brush of Light
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-4 font-light">Premium Memorial Art for Funeral Homes</p>
            <p className="text-stone-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Partner with us to offer families a deeply meaningful way to honor their loved ones through custom-painted memorial portraits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setOnboardingOpen(true)}
                className="px-8 py-4 bg-white text-stone-900 font-bold rounded-xl hover:bg-amber-50 transition-all shadow-lg flex items-center justify-center gap-3"
              >
                <HandHeart size={20} />
                Start Partnership Agreement
                <ArrowRight size={20} />
              </button>
              <a
                href="#benefits"
                className="px-8 py-4 bg-stone-800/50 backdrop-blur text-white font-bold rounded-xl hover:bg-stone-700/50 transition-all border border-white/20 flex items-center justify-center gap-3"
              >
                Learn More
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </Section>

        {/* Value Proposition */}
        <Section id="benefits" className="bg-white">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold serif mb-4">Why Partner With Us?</h2>
            <p className="text-stone-600 text-lg max-w-3xl mx-auto">
              Enhance your service offerings with premium memorial art while generating additional revenue for your funeral home.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitCard
              icon={DollarSign}
              title="20% Commission"
              description="Earn a substantial commission on every memorial art piece sold through your funeral home. A new revenue stream with minimal effort."
            />
            <BenefitCard
              icon={Heart}
              title="Meaningful Service"
              description="Offer families a truly unique way to remember their loved ones. These aren't photos—they're hand-painted works of art."
            />
            <BenefitCard
              icon={ShieldCheck}
              title="Zero Risk"
              description="No upfront costs, no inventory to manage. We handle production, quality control, and shipping. You simply introduce the service."
            />
            <BenefitCard
              icon={Palette}
              title="Master Artistry"
              description="Every piece is hand-painted by professional artists with years of experience in portraiture and memorial art."
            />
            <BenefitCard
              icon={TrendingUp}
              title="Marketing Support"
              description="Receive professional marketing materials, display easels, sample prints, and ongoing support to help you present the service."
            />
            <BenefitCard
              icon={HandHeart}
              title="Trusted Partnership"
              description="Join a network of funeral homes nationwide who trust Ezelle Art to honor their families with compassion and excellence."
            />
          </div>
        </Section>

        {/* How It Works */}
        <Section className="bg-gradient-to-br from-amber-50 to-stone-50">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold serif mb-4">Simple Process</h2>
            <p className="text-stone-600 text-lg">From agreement to commission, we make it effortless.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: '1', title: 'Sign Agreement', desc: 'Complete our quick digital partnership agreement right here on this page.' },
              { num: '2', title: 'Receive Materials', desc: 'Get your marketing kit with samples, brochures, and display easel.' },
              { num: '3', title: 'Introduce Service', desc: 'Present Brush of Light to families during your arrangement conferences.' },
              { num: '4', title: 'Earn Commission', desc: 'When families order, we create the art and you receive 20% commission.' },
            ].map(step => (
              <div key={step.num} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-stone-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <Section className="bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 text-white text-center">
          <h2 className="text-4xl md:text-5xl font-bold serif mb-6">Ready to Partner?</h2>
          <p className="text-xl text-amber-100 mb-10 max-w-2xl mx-auto">
            Join funeral homes across the country offering this meaningful service to families in their time of need.
          </p>
          <button
            onClick={() => setOnboardingOpen(true)}
            className="px-10 py-5 bg-white text-stone-900 font-bold text-lg rounded-xl hover:bg-amber-50 transition-all shadow-xl flex items-center gap-3 mx-auto"
          >
            <HandHeart size={24} />
            Start Your Partnership Today
            <ArrowRight size={24} />
          </button>
        </Section>

        {/* Footer */}
        <footer className="bg-stone-900 text-stone-300 py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Logo size="sm" />
                  <div>
                    <h3 className="font-bold text-white">Brush of Light</h3>
                    <p className="text-xs text-stone-400">by Ezelle Art LLC</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  Creating meaningful memorial art to honor lives well-lived.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Contact</h4>
                <p className="text-sm mb-2">Ezelle Art LLC</p>
                <p className="text-sm mb-2">ezelle@ezelleart.com</p>
                <button
                  onClick={() => setContactOpen(true)}
                  className="text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
                >
                  Send us a message →
                </button>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Legal</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setLegalModal('PRIVACY')}
                    className="block text-sm hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </button>
                  <button
                    onClick={() => setLegalModal('TERMS')}
                    className="block text-sm hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </button>
                </div>
              </div>
            </div>
            <div className="border-t border-stone-700 pt-8 text-center text-sm text-stone-400">
              <p>&copy; {new Date().getFullYear()} Ezelle Art LLC. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </div>

      {/* Modals */}
      <ContactPortal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <OnboardingPortal isOpen={onboardingOpen} onClose={() => setOnboardingOpen(false)} />
      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
    </>
  );
}

export default App;