'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Mail } from 'lucide-react';
import Toast from '@/components/ui/Toast';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setToast({ message: 'Veuillez renseigner votre email', type: 'error' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => null);
        setToast({ message: error?.message || 'Une erreur est survenue', type: 'error' });
        return;
      }

      setToast({
        message: 'Si un compte existe, un lien de réinitialisation a été envoyé.',
        type: 'success',
      });
    } catch (err) {
      console.error('Forgot password error:', err);
      setToast({ message: 'Impossible de traiter la demande pour le moment', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/connexion');
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
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-2xl p-6 max-w-sm w-full relative">
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="Retour"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="text-center mb-8 mt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Biggigui</h1>
          <h2 className="text-xl text-gray-700">Mot de passe oublié</h2>
          <p className="text-sm text-gray-600 mt-2">
            Entrez votre email pour recevoir un lien de réinitialisation.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Vous vous souvenez de votre mot de passe ?{' '}
            <button
              type="button"
              onClick={handleBack}
              className="text-gray-900 font-semibold hover:underline"
            >
              Retour à la connexion
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
