import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import logoImage from '../assets/images/logo.jpeg';

// SVG Icons for Social
const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccess('Ingreso realizado.');
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] font-dm relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Layers */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');
        
        /* Background glow blobs */
        .glow-red {
          position: fixed;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: #E8362A;
          filter: blur(120px);
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
        }
        
        .glow-blue {
          position: fixed;
          bottom: -200px;
          left: -200px;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: #2AACE8;
          filter: blur(120px);
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
        }
        
        .stripe-texture {
          position: fixed;
          inset: 0;
          background-image: repeating-linear-gradient(
            -55deg,
            transparent 0px,
            transparent 1px,
            rgba(255, 255, 255, 0.02) 1px,
            rgba(255, 255, 255, 0.02) 2px
          );
          pointer-events: none;
          z-index: 0;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out both;
        }
        
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.15s; }
        .delay-3 { animation-delay: 0.2s; }
        .delay-4 { animation-delay: 0.25s; }
        .delay-5 { animation-delay: 0.3s; }
      `}</style>

      {/* Background Blobs */}
      <div className="glow-red" />
      <div className="glow-blue" />
      <div className="stripe-texture" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm mx-auto">
        
        {/* Logo */}
        <div className="animate-slide-up delay-1 flex justify-center mb-8">
          <div className="relative w-28 h-28 rounded-full border-2 border-white/20 bg-black flex items-center justify-center ring-4 ring-white/5 shadow-lg overflow-hidden">
            <img 
              src={logoImage} 
              alt="Barbería Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Heading Block */}
        <div className="animate-slide-up delay-2 text-center mb-6">
          <h1 className="font-bebas text-5xl tracking-widest text-white leading-tight">
            BIENVENIDO
          </h1>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mt-2">
            Inicia sesión en tu cuenta
          </p>
        </div>

        {/* Accent Divider */}
        <div className="animate-slide-up delay-3 flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E8362A]" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#2AACE8]" />
        </div>

        {/* Card */}
        <div className="animate-slide-up delay-4 bg-white/5 backdrop-blur-xl border border-white/8 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition focus:border-[#2AACE8] focus:bg-[#2AACE8]/10 focus:ring-2 focus:ring-[#2AACE8]/20"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-[#E8362A]">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="•••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition focus:border-[#2AACE8] focus:bg-[#2AACE8]/10 focus:ring-2 focus:ring-[#2AACE8]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-xs text-[#E8362A]">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-xs text-white/30 hover:text-[#2AACE8] transition">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Success Message */}
            {success && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-300 text-center">{success}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bebas text-lg tracking-[0.15em] text-white bg-[#E8362A] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(232,54,42,0.45)] transition-all"
            >
              ENTRAR
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t border-white/10" />
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/25">o continúa con</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/4 text-white/50 text-xs hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              <GoogleIcon />
              Google
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/4 text-white/50 text-xs hover:bg-white/10 hover:border-white/20 hover:text-white transition-all"
            >
              <FacebookIcon />
              Facebook
            </button>
          </div>
        </div>

        {/* Register Link */}
        <div className="animate-slide-up delay-5 text-center mt-6">
          <p className="text-xs text-white/40">
            ¿No tienes cuenta?{' '}
            <a href="/register" className="text-[#2AACE8] font-medium hover:opacity-75 transition">
              Regístrate gratis
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
