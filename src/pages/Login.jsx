import { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
    }
    if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSuccess('¡Inicio de sesión exitoso!');
    setFormData({
      email: '',
      password: '',
    });
    setErrors({});

    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black p-10 rounded-lg">
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">Iniciar sesión</h2>
          <p className="text-gray-600">Accede a tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-gray-50"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

    

          {/* Contraseña */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-gray-50"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Mensaje de éxito */}
          {success && (
            <div className="p-4 bg-green-50 border border-green-500 rounded-lg">
              <p className="text-sm text-green-600 font-medium text-center">{success}</p>
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-red-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Link a login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            ¿No tenés cuenta?{' '}
            <a href="/register" className="text-blue-600 font-semibold hover:underline">
              Registrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
