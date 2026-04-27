import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import logoImage from '../assets/images/logo.jpeg';
import Navbar from '../components/Navbar';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    setErrors({});
    setSuccess('Registro deshabilitado por el momento.');
    setTimeout(() => {
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
      setSuccess('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0E0E0E] font-dm relative overflow-hidden flex items-center justify-center p-4 pt-24">
      <Navbar />
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
        
        /* Hide scrollbar but keep scrolling functionality */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Background Blobs */}
      <div className="glow-red" />
      <div className="glow-blue" />
      <div className="stripe-texture" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        
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
            REGISTRO
          </h1>
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mt-2">
            Crea tu cuenta
          </p>
        </div>

        {/* Accent Divider */}
        <div className="animate-slide-up delay-3 flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E8362A]" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#2AACE8]" />
        </div>

        {/* Card */}
        <div className="animate-slide-up delay-4 bg-white/5 backdrop-blur-xl border border-white/8 rounded-3xl p-8 shadow-2xl max-h-[85vh] overflow-y-auto hide-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Nombre Input */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Juan Pérez"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition focus:border-[#2AACE8] focus:bg-[#2AACE8]/10 focus:ring-2 focus:ring-[#2AACE8]/20"
              />
              {errors.nombre && (
                <p className="mt-2 text-xs text-[#E8362A]">{errors.nombre}</p>
              )}
            </div>

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
                placeholder="Registro de email deshabilitado"
                disabled
                className="w-full bg-zinc-500/20 border border-zinc-400/30 rounded-xl px-4 py-3 text-zinc-300 placeholder-zinc-400 text-sm cursor-not-allowed"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-[#E8362A]">{errors.email}</p>
              )}
            </div>

            {/* Teléfono Input */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="099 123 456"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition focus:border-[#2AACE8] focus:bg-[#2AACE8]/10 focus:ring-2 focus:ring-[#2AACE8]/20"
              />
              {errors.telefono && (
                <p className="mt-2 text-xs text-[#E8362A]">{errors.telefono}</p>
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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="•••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition focus:border-[#2AACE8] focus:bg-[#2AACE8]/10 focus:ring-2 focus:ring-[#2AACE8]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-xs text-[#E8362A]">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Success Message */}
            {success && (
              <div className="p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-300 text-center">{success}</p>
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bebas text-lg tracking-[0.15em] text-white bg-[#E8362A] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(232,54,42,0.45)] transition-all mt-2"
            >
              REGISTRARSE
            </button>
          </form>
        </div>

        {/* Login Link */}
        <div className="animate-slide-up delay-5 text-center mt-6">
          <p className="text-xs text-white/40">
            ¿Ya tienes cuenta?{' '}
            <a href="/login" className="text-[#2AACE8] font-medium hover:opacity-75 transition">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
