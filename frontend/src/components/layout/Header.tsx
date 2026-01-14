'use client';

import {
  Search,
  Grid,
  Settings,
  Tag,
  Home,
  Star,
  Sparkles,
  BookOpen,
  Gift,
  MoreHorizontal,
  Settings as SettingsAuto,
  Settings as SettingsBricolage,
  Star as StarAnimaux,
  ShoppingCart,
  ShoppingCart as CartImmobilier,
  ShoppingCart as CartRestaurant,
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import LoginForm from '../auth/LoginForm';
import handleLoginSelect from '@/components/ui/AuthModal';
import AuthModal from '@/components/ui/AuthModal';

export default function Header() {
  const [activeCategory, setActiveCategory] = useState('tous');
  const [showMore, setShowMore] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const mainCategories = [
    { id: 'tous', icon: Grid, label: 'Tous' },
    { id: 'electronique', icon: Settings, label: 'Électronique' },
    { id: 'mode', icon: Tag, label: 'Mode' },
    { id: 'maison', icon: Home, label: 'Maison' },
    { id: 'sports', icon: Star, label: 'Sports' },
    { id: 'beaute', icon: Sparkles, label: 'Beauté' },
    { id: 'livres', icon: BookOpen, label: 'Livres' },
    { id: 'jouets', icon: Gift, label: 'Jouets' },
  ];

  const moreCategories = [
    { id: 'auto', icon: SettingsAuto, label: 'Auto/Moto' },
    { id: 'bricolage', icon: SettingsBricolage, label: 'Bricolage' },
    { id: 'animaux', icon: StarAnimaux, label: 'Animaux' },
    { id: 'epicerie', icon: ShoppingCart, label: 'Épicerie' },
    { id: 'immobilier', icon: CartImmobilier, label: 'Immobilier Digitale' },
    { id: 'restaurant', icon: CartRestaurant, label: 'Restaurant Digitale' },
  ];

  return (
    <header className="bg-white shadow-md">
      {/* Section 1: Logo, Search, Auth */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 whitespace-nowrap">Biggigui</h1>
          </div>

          {/* Zone droite: barre de recherche + liens auth */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Barre de recherche à droite */}
            <div className="w-48">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher des produits"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>

            {/* Liens d'authentification */}
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg whitespace-nowrap">
              <Link 
                href="/connexion"
                className="text-green-600 font-bold hover:text-green-700 transition-colors text-sm"
              >
                Se connecter
              </Link>
              <span className="text-gray-400">/</span>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="text-orange-500 font-bold hover:text-orange-600 transition-colors text-sm"
              >
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Navigation catégories - Fond gris clair */}
      <div className="bg-gray-50 border-t-2 border-gray-200">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-3 py-4 text-sm flex-wrap">
          {mainCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'text-orange-500 hover:bg-white hover:shadow-md font-medium'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{category.label}</span>
              </button>
            );
          })}

          {/* Catégories supplémentaires */}
          {showMore && moreCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'text-orange-500 font-medium'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{category.label}</span>
              </button>
            );
          })}

          {/* Bouton Plus */}
          <button
            onClick={() => setShowMore(!showMore)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
              showMore
                ? 'text-orange-500 font-medium hover:bg-white hover:shadow-md hover:border border-gray-200'
                : 'text-blue-600 hover:bg-gray-100'
            }`}
          >
            {showMore ? (
              <>
                <ChevronUp className="w-5 h-5" />
                <span>Moins</span>
              </>
            ) : (
              <>
                <MoreHorizontal className="w-5 h-5" />
                <span>Plus...</span>
              </>
            )}
          </button>
          </nav>
        </div>
      </div>

      {/* Modal d'authentification */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
}