
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
    <div className="fixed inset-0 z-[100] flex items