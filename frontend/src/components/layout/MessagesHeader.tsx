'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, LogOut } from 'lucide-react';

export default function MessagesHeader() {
  const [activeNav, setActiveNav] = useState('Message');

  const navLinks = [
    { href: '/market', label: 'Home' },
    { href: '/market/articles', label: 'Articles' },
    { href: '/market/messages', label: 'Message' },
    { href: '/market/profil', label: 'Profil' },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 gap-6">
          {/* Logo à gauche */}
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-gray-900 whitespace-nowrap">Biggigui</h1>
          </div>

          {/* Navigation principale au centre */}
          <nav className="flex items-center justify-center gap-6 text-sm text-gray-800 flex-1">
            {navLinks.map(({ href, label }) => {
              const isActive = activeNav === label;
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setActiveNav(label)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive ? 'bg-orange-500 text-white' : 'text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Barre de recherche + Profil + Notification + Déconnexion à droite */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-48">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <button className="relative p-2 hover:bg-gray-100 rounded-lg" aria-label="Notifications">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-lg">
              <img
                src="https://ui-avatars.com/api/?name=Jean+Dupont&background=FF6B35&color=fff"
                alt="Profil"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-800">Jean Dupont</span>
            </button>

            <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold text-orange-500 hover:bg-gray-200">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
