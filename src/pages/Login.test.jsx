import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import Login from './Login';
import { AuthProvider } from '../context/AuthContext';
import authService from '../services/authService';

// vi.hoisted permite usar navigateMock dentro del factory de vi.mock (que se hoistea)
const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));

// Mockeamos useNavigate para verificar a qué ruta redirige el login
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, useNavigate: () => navigateMock };
});

// Mockeamos el servicio de auth: así no se hace ninguna llamada HTTP real al BFF.
// El resto (AuthContext + Login) corre real.
vi.mock('../services/authService', () => ({
  default: {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    getCurrentUser: vi.fn(() => null),
    getToken: vi.fn(() => null),
  },
}));

const EMAIL_PLACEHOLDER = 'correo@ejemplo.com';
const PASSWORD_PLACEHOLDER = '•••••••••';

// Renderiza Login con el mismo árbol de providers que usa la app
async function renderLogin() {
  const utils = render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );
  // AuthProvider arranca con loading=true; esperamos a que el botón quede habilitado
  await screen.findByRole('button', { name: 'ENTRAR' });
  return utils;
}

describe('Flujo de login (Login.jsx)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra errores de validación si se envía el formulario vacío y no llama al servicio', async () => {
    const user = userEvent.setup();
    await renderLogin();

    await user.click(screen.getByRole('button', { name: 'ENTRAR' }));

    expect(screen.getByText('El email es requerido')).toBeInTheDocument();
    expect(screen.getByText('La contraseña es requerida')).toBeInTheDocument();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('valida el largo mínimo de la contraseña (6 caracteres)', async () => {
    const user = userEvent.setup();
    await renderLogin();

    await user.type(screen.getByPlaceholderText(EMAIL_PLACEHOLDER), 'ana@test.com');
    await user.type(screen.getByPlaceholderText(PASSWORD_PLACEHOLDER), '123');
    await user.click(screen.getByRole('button', { name: 'ENTRAR' }));

    expect(screen.getByText(/6 caracteres/)).toBeInTheDocument();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('login exitoso de un cliente: llama al servicio con los datos y redirige a /home', async () => {
    authService.login.mockResolvedValue({
      id: 1,
      token: 'jwt-falso',
      email: 'ana@test.com',
      nombre: 'Ana',
      rol: 'CLIENTE',
    });
    const user = userEvent.setup();
    await renderLogin();

    await user.type(screen.getByPlaceholderText(EMAIL_PLACEHOLDER), 'ana@test.com');
    await user.type(screen.getByPlaceholderText(PASSWORD_PLACEHOLDER), 'secreta123');
    await user.click(screen.getByRole('button', { name: 'ENTRAR' }));

    expect(authService.login).toHaveBeenCalledWith('ana@test.com', 'secreta123');
    expect(await screen.findByText('¡Inicio de sesión exitoso!')).toBeInTheDocument();

    // Login.jsx redirige recién a los 1.5 s (setTimeout), por eso el timeout extendido
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/home'), { timeout: 3000 });
  });

  it('login exitoso de un ADMIN: redirige a /dashboard', async () => {
    // El backend devuelve el rol en mayúsculas (Usuario.Rol.ADMIN.toString())
    authService.login.mockResolvedValue({
      id: 2,
      token: 'jwt-falso',
      email: 'admin@barberia.com',
      nombre: 'Carlos López',
      rol: 'ADMIN',
    });
    const user = userEvent.setup();
    await renderLogin();

    await user.type(screen.getByPlaceholderText(EMAIL_PLACEHOLDER), 'admin@barberia.com');
    await user.type(screen.getByPlaceholderText(PASSWORD_PLACEHOLDER), 'admin123');
    await user.click(screen.getByRole('button', { name: 'ENTRAR' }));

    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/dashboard'), { timeout: 3000 });
  });

  it('login fallido: muestra un mensaje de error y no redirige', async () => {
    // Forma real del error que llega desde el BFF (errorHandler.js): { error, status }
    authService.login.mockRejectedValue({
      error: 'Request failed with status code 401',
      status: 401,
    });
    const user = userEvent.setup();
    await renderLogin();

    await user.type(screen.getByPlaceholderText(EMAIL_PLACEHOLDER), 'ana@test.com');
    await user.type(screen.getByPlaceholderText(PASSWORD_PLACEHOLDER), 'clave-incorrecta');
    await user.click(screen.getByRole('button', { name: 'ENTRAR' }));

    expect(await screen.findByText('Error al iniciar sesión')).toBeInTheDocument();
    expect(screen.queryByText('¡Inicio de sesión exitoso!')).not.toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it('el botón del ojo alterna la visibilidad de la contraseña', async () => {
    const user = userEvent.setup();
    await renderLogin();

    const passwordInput = screen.getByPlaceholderText(PASSWORD_PLACEHOLDER);
    expect(passwordInput).toHaveAttribute('type', 'password');

    // El botón no tiene texto ni aria-label: lo buscamos dentro del contenedor del input
    const toggle = passwordInput.parentElement.querySelector('button');
    await user.click(toggle);
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(toggle);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
