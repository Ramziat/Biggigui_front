'use client';

import { X, Edit3, Lock } from 'lucide-react';
import { useState, useMemo } from 'react';
import { countries } from '@/lib/countries';

type LocalUser = {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  network?: string;
  userType?: string;
};

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: LocalUser | null;
  onSave?: (updatedUser: LocalUser) => void;
}

export default function UpdateProfileModal({
  isOpen,
  onClose,
  user,
  onSave,
}: UpdateProfileModalProps) {
  const [formData, setFormData] = useState<LocalUser>(user ?? {});
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Générer les initiales de l'utilisateur
  const getInitials = () => {
    if (!formData.name) return '?';
    return formData.name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const countryName = useMemo(() => {
    if (!formData.country) return undefined;
    return countries.find((c) => c.code === formData.country)?.name;
  }, [formData.country]);

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    // Ici  faut appeler une API pour changer le mot de passe
    alert('Mot de passe changé avec succès');
    setShowPasswordChange(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-6 sticky top-0 bg-white">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Modifier le profil</h2>
              <p className="text-sm text-gray-600 mt-1">
                Mettez à jour vos informations personnelles et vos paramètres de sécurité
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Contenu */}
          <div className="p-8">
            {/* Avatar Section */}
            <div className="text-center mb-8">
              <div className="inline-block relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-4xl shadow-lg">
                  {getInitials()}
                </div>
                <button className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg">
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 text-sm mt-4">
                Cliquez sur l'icône pour changer votre photo de profil
              </p>
            </div>

            {/* Contenu principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Informations personnelles */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-blue-600 rounded" />
                  Informations personnelles
                </h3>

                <div className="space-y-5">
                  {/* Nom complet */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.name ?? ''}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Votre nom complet"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        👤
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email ?? ''}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="votre@email.com"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        ✉️
                      </div>
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.phone ?? ''}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Votre numéro de téléphone"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        📱
                      </div>
                    </div>
                  </div>

                  {/* Pays */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pays
                    </label>
                    <select
                      value={formData.country ?? ''}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                    >
                      <option value="">Sélectionner un pays</option>
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Sécurité du compte */}
              <section>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Sécurité du compte
                </h3>

                <div className="space-y-4">
                  {/* Bouton Changer le mot de passe */}
                  <button
                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    Changer le mot de passe
                  </button>

                  {/* Formulaire de changement de mot de passe */}
                  {showPasswordChange && (
                    <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mot de passe actuel
                        </label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Entrez votre mot de passe actuel"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Entrez un nouveau mot de passe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmer le mot de passe
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Confirmez le mot de passe"
                        />
                      </div>

                      <button
                        onClick={handlePasswordChange}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                      >
                        Confirmer le changement
                      </button>
                    </div>
                  )}

                  {/* Conseils de sécurité */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      🔒 Conseils de sécurité
                    </h4>
                    <ul className="space-y-2 text-sm text-blue-900">
                      <li className="flex gap-2">
                        <span className="font-bold">•</span>
                        <span>
                          <strong>Utilisez un mot de passe fort et unique</strong>
                        </span>
                      </li>
                      <li className="flex gap-2">
                        <span className="font-bold">•</span>
                        <span>
                          <strong>Changez régulièrement votre mot de passe</strong>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Footer avec boutons */}
          <div className="border-t p-6 flex gap-3 justify-end bg-gray-50 sticky bottom-0">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Enregistrer les modifications
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
