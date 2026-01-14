'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Phone, Mail, Lock } from 'lucide-react';
import Toast from '@/components/ui/Toast';

interface LoginFormProps {
  onBack: () => void;
  userType: 'buyer' | 'seller';
}


export default function LoginForm({ onBack, userType }: LoginFormProps) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleRegisterRedirect = () => {
    router.push('/inscription');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setToast({ message: 'Veuillez remplir tous les champs', type: 'error' });
      return;
    }

    setIsLoading(true);

    try {
      // Appel API pour se connecter
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setToast({ message: error.message || 'Erreur lors de la connexion', type: 'error' });
        return;
      }

      const data = await response.json();
      
      // Succès
      setToast({ message: 'Connexion réussie!', type: 'success' });
      try {
        const existing = typeof window !== 'undefined' ? localStorage.getItem('biggigui_user') : null;
        const existingUser = existing ? JSON.parse(existing) : {};
        const mergedUser = { ...existingUser, ...data.user };
        if (typeof window !== 'undefined') {
          localStorage.setItem('biggigui_user', JSON.stringify(mergedUser));
          if (data.token) localStorage.setItem('biggigui_token', data.token);
        }
      } catch (e) {
        console.warn('Unable to persist user in localStorage', e);
      }
      
      // Redirection basée sur le type d'utilisateur retourné par l'API
      const loggedUserType = data.user?.userType || 'buyer';
      setTimeout(() => {
        // Redirige selon le type d'utilisateur
        if (loggedUserType === 'seller') {
          router.push('/seller');
        } else {
          router.push('/market');
        }
      }, 1500);
    } catch (error) {
      setToast({ message: 'Erreur lors de la connexion', type: 'error' });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/assets/Background_v2.jpg')",
        backgroundPosition: 'center',
        backgroundSize: '40%',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Toast de notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Card principale */}
      <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-2xl p-4 max-w-sm w-full relative">
        {/* Bouton retour */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* En-tête */}
        <div className="text-center mb-8 mt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Biggigui</h1>
          <h2 className="text-xl text-gray-700">Sign in</h2>
        </div>

        {/* Formulaire */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Mot de passe */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5" />
            <input
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <button
              type="button"
              onClick={handleForgotPassword}
              className="text-right w-full text-gray-900 font-semibold hover:underline underline"
            >
              Mot de passe oublié?
          </button>
          {/* Bouton S'inscrire */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>

          {/* Lien Sign in */}
          <p className="text-center text-sm text-gray-600">
            You don't have an account?{' '}
            <button
              type="button"
              onClick={handleRegisterRedirect}
              className="text-gray-900 font-semibold hover:underline"
            >
              Register Now
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
