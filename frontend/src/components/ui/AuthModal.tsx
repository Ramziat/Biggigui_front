'use client';

import { X } from 'lucide-react';
import { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();

  const [showLoginType, setShowLoginType] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterType, setShowRegisterType] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');

  if (!isOpen) return null;

  const handleClose = () => {
    setShowRegisterType(false);
    setShowRegisterForm(false);
    onClose();
  };

  const handleUserTypeSelect = (type: 'buyer' | 'seller') => {
    setUserType(type);
    handleClose();
    if (type === 'buyer') {
      router.push('/inscription');
    } else {
      router.push('/portail-vendeur');
    }
  };

  const handleLoginSelect = () => {
    handleClose();
    router.push('/connexion');
    return;
  };

  const handleBackToModal = () => {
    setShowRegisterForm(false);
  };

  // Si le formulaire d'inscription est affiché, ne pas afficher le modal
  if (showRegisterForm) {
    return <RegisterForm onBack={handleBackToModal} userType={userType} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 z-10">
        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Contenu */}
        {!showRegisterType ? (
          <div>
            <h2 className="text-lg text-gray-900 mb-5">
              Vous n'êtes pas connectez
            </h2>

            <div className="flex justify-between">
              <button 
                onClick={handleLoginSelect}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Se connecter
              </button>
              <button 
                onClick={() => setShowRegisterType(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                S'inscrire
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-lg text-gray-900 mb-8">
              S'inscrire en tant que:
            </h2>

            <div className="flex justify-between">
              <button 
                onClick={() => handleUserTypeSelect('buyer')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Acheteur
              </button>
              <button 
                onClick={() => handleUserTypeSelect('seller')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Vendeur
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
