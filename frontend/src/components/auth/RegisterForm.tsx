'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Phone, Mail, Lock } from 'lucide-react';
import { countries } from '@/lib/countries';
import Toast from '@/components/ui/Toast';

interface RegisterFormProps {
  onBack: () => void;
  userType: 'buyer' | 'seller';
}

const beninNetworks = ['MTN', 'MOOV', 'CELTIS BJ'];

export default function RegisterForm({ onBack, userType }: RegisterFormProps) {
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState('BJ');
  const [selectedNetwork, setSelectedNetwork] = useState('MTN');
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const handleLoginRedirect = () => {
    router.push('/connexion');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation de base
    if (!formData.name || !formData.phone || !formData.email || !formData.password) {
      setToast({ message: 'Tous les champs sont requis', type: 'error' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setToast({ message: 'Les mots de passe ne correspondent pas', type: 'error' });
      return;
    }

    if (!formData.agreeTerms) {
      setToast({ message: 'Veuillez accepter les conditions', type: 'error' });
      return;
    }

    setIsLoading(true);

    try {
      // Appel API pour enregistrer l'utilisateur
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: `${selectedCountryData?.dialCode}${formData.phone}`,
          email: formData.email,
          password: formData.password,
          userType: userType,
          country: selectedCountry,
          network: showNetworkField ? selectedNetwork : null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setToast({ message: error.message || 'Erreur lors de l\'inscription', type: 'error' });
        return;
      }

      // Succès
      setToast({ message: 'Inscription réussie! Redirection vers la connexion...', type: 'success' });
      // Mémoriser un profil local de base pour affichage du profil
      try {
        const profile = {
          name: formData.name,
          email: formData.email,
          phone: `${selectedCountryData?.dialCode}${formData.phone}`,
          country: selectedCountry,
          network: showNetworkField ? selectedNetwork : undefined,
          userType: userType,
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('biggigui_user', JSON.stringify(profile));
        }
      } catch (e) {
        console.warn('Unable to persist registered user profile', e);
      }
      
      // Redirection après 2 secondes
      setTimeout(() => {
        router.push('/connexion');
      }, 2000);
    } catch (error) {
      setToast({ message: 'Erreur lors de l\'inscription', type: 'error' });
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showNetworkField = selectedCountry === 'BJ';
  const selectedCountryData = countries.find((c) => c.code === selectedCountry);

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
          <h2 className="text-xl text-gray-700">Create an account</h2>
        </div>

        {/* Formulaire */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nom */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5" />
            <input
              type="text"
              placeholder="Nom"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Pays et Téléphone */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5" />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name} ({country.dialCode})
                  </option>
                ))}
              </select>
            </div>

            <input
              type="tel"
              placeholder={`${selectedCountryData?.dialCode ?? ''} Téléphone`}
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Réseau (seulement si Bénin) */}
          {showNetworkField && (
            <div>
              <label className="block text-sm text-gray-900 mb-2">Réseau:</label>
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
              >
                {beninNetworks.map((network) => (
                  <option key={network} value={network}>
                    {network}
                  </option>
                ))}
              </select>
            </div>
          )}

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

          {/* Confirmer mot de passe */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5" />
            <input
              type="password"
              placeholder="Confimer le mot de passe"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreeTerms}
              onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the terms and policy.
            </label>
          </div>

          {/* Bouton S'inscrire */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold py-3 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
          </button>

          {/* Lien Sign in */}
          <p className="text-center text-sm text-gray-600">
            Do you already have an account?{' '}
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="text-gray-900 font-semibold hover:underline"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
