"use client";

import MarketHeader from '@/components/layout/MarketHeader';
import UpdateProfileModal from '@/components/modals/UpdateProfileModal';
import { MapPin } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { countries } from '@/lib/countries';

type LocalUser = {
  name?: string;
  email?: string;
  phone?: string;
  country?: string; // ISO code
  network?: string;
  userType?: string;
};

export default function ProfilPage() {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [activeTab, setActiveTab] = useState<'profil' | 'commandes' | 'favoris'>('profil');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('biggigui_user') : null;
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const handleUpdateProfile = (updatedUser: LocalUser) => {
    setUser(updatedUser);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('biggigui_user', JSON.stringify(updatedUser));
      }
    } catch {}
  };

  const countryName = useMemo(() => {
    if (!user?.country) return undefined;
    return countries.find((c) => c.code === user.country)?.name;
  }, [user?.country]);

  const displayName = user?.name || 'Utilisateur';
  const locationText = `${countryName ?? 'Bénin'}`; // valeur par défaut proche de la maquette

  return (
    <div className="min-h-screen bg-gray-100">
      <MarketHeader />

      <UpdateProfileModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        user={user}
        onSave={handleUpdateProfile}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Bandeau profil */}
        <section className="bg-gray-100 border rounded-xl p-8 mb-8">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-semibold border-4 border-white shadow-sm">
              Logo
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">{displayName}</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Non spécifié, {locationText}</span>
            </p>
            <button 
              onClick={() => setIsUpdateModalOpen(true)}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow">
              Mettre à jour le profil
            </button>
          </div>
        </section>

        {/* Onglets */}
        <nav className="flex gap-8 border-b mb-6 text-sm">
          {[
            { key: 'profil', label: 'Mon Profil' },
            { key: 'commandes', label: 'Mes Commandes' },
            { key: 'favoris', label: 'Mes Favoris' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`pb-3 -mb-px font-medium ${
                activeTab === (key as any)
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Contenu des onglets */}
        {activeTab === 'profil' && (
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoRow label="Nom complet" value={user?.name ?? '—'} />
              <InfoRow label="Email" value={user?.email ?? '—'} />
              <InfoRow label="Téléphone" value={user?.phone ?? '—'} />
              <InfoRow label="Pays" value={countryName ?? '—'} />
              <InfoRow label="Réseau" value={user?.network ?? '—'} />
              <InfoRow label="Type d'utilisateur" value={user?.userType ?? '—'} />
            </div>
          </section>
        )}

        {activeTab === 'commandes' && (
          <section className="bg-white rounded-lg shadow-sm p-6 text-gray-600">
            Aucune commande pour le moment.
          </section>
        )}

        {activeTab === 'favoris' && (
          <section className="bg-white rounded-lg shadow-sm p-6 text-gray-600">
            Aucun favori pour le moment.
          </section>
        )}
      </main>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase text-gray-500 mb-1">{label}</div>
      <div className="text-gray-900 font-medium">{value}</div>
    </div>
  );
}
