'use client';

import {
  Search,
  Grid,
  Settings,
  Tag,
  Home as HomeIcon,
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
  MessageSquare,
  User,
  FileText,
  LogOut,
  Bell,
} from 'lucide-react';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MarketHeader() {
  const router = useRouter();

  const [activeCategory, setActiveCategory] = useState('tous');
  const pathname = usePathname();
  const [showMore, setShowMore] = useState(false);

  const navLinks = [
    { href: '/market', label: 'Home', icon: HomeIcon },
    { href: '/market/articles', label: 'Articles', icon: FileText },
    { href: '/market/messages', label: 'Message', icon: MessageSquare },
    { href: '/market/profil', label: 'Profil', icon: User },
  ];

  const mainCategories = [
    { id: 'tous', icon: Grid, label: 'Tous' },
    { id: 'electronique', icon: Settings, label: 'Électronique' },
    { id: 'mode', icon: Tag, label: 'Mode' },
    { id: 'maison', icon: HomeIcon, label: 'Maison' },
    { id: 'sports', icon: Star, label: 'Sports' },
    { id: 'beaute', icon: Sparkles, label: 'Beauté' },
    { id: 'livres', icon: BookOpen, label: 'Livres' },
    { id: 'jouets', icon: Gift, label: 'Jouets' },
  ];

  const handleRedirectDeconnect = () => {
    router.push('/connexion');
  };

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
      {/* Barre du haut */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 gap-6">
          {/* Logo à gauche */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 whitespace-nowrap">Biggigui</h1>
          </div>

          {/* Navigation principale au centre */}
          <nav className="flex items-center justify-center gap-6 text-sm text-gray-800 flex-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = label === 'Home' ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Barre de recherche + Profil + Notification + Déconnexion à droite */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Barre de recherche */}
            <div className="w-48">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Notification */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Photo de profil */}
            <button className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-lg">
              <img
                src="https://ui-avatars.com/api/?name=Jean+Dupont&background=FF6B35&color=fff"
                alt="Profil"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-800">Jean Dupont</span>
            </button>

            {/* Déconnexion */}
            <button
              onClick={handleRedirectDeconnect} 
              className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold text-orange-500 hover:bg-gray-200">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Barre catégories */}
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'text-orange-500 font-bold hover:bg-white'
                      : 'text-black font-bold hover:bg-gray-200 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.label}</span>
                </button>
              );
            })}

            {showMore && moreCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'text-orange-500 font-bold hover:bg-white'
                      : 'text-black font-bold hover:bg-gray-200 hover:text-blue-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.label}</span>
                </button>
              );
            })}

            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 text-blue-600 font-bold hover:bg-gray-200"
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
    </header>
  );
}
