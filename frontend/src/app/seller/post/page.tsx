"use client";

import { useState } from 'react';
import SellerHeader from '@/components/layout/SellerHeader';
import Footer from '@/components/layout/Footer';
import { Upload, Info } from 'lucide-react';

export default function SellerPostPage() {
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [form, setForm] = useState({
    name: '',
    category: '',
    condition: '',
    description: '',
    price: '',
    currency: '',
    location: '',
  });

  const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const files = Array.from(e.target.files || []);
    if (type === 'image') {
      setImages(prev => [...prev, ...files].slice(0, 5));
    } else {
      setVideos(prev => [...prev, ...files].slice(0, 1));
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Démo uniquement: aucune requête envoyée
    alert('Aperçu de publication (démo uniquement).');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SellerHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-4 text-sm text-gray-600">
          Connecté en tant que : <span className="font-semibold">Vendeur</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Créer un nouveau produit</h1>

        <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Zone upload */}
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
                <Upload className="w-10 h-10 text-gray-500 mb-3" />
                <p className="font-semibold text-gray-800">Ajouter des images/vidéos</p>
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  <p>Images: {images.length}/5 (min 1, max 5)</p>
                  <p>Vidéos: {videos.length}/1 (max 1)</p>
                  <p className="text-xs mt-2">Formats: JPG, PNG, GIF, WEBP, MP4</p>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-medium">
                    Importer des images
                    <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onSelectFiles(e, 'image')} />
                  </label>
                  <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-medium">
                    Importer une vidéo
                    <input type="file" accept="video/mp4,video/webm" className="hidden" onChange={(e) => onSelectFiles(e, 'video')} />
                  </label>
                </div>
              </div>
            </div>

            {/* Formulaire droite */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit *</label>
                <input
                  type="text"
                  placeholder="Ex: T-shirt en coton"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">-- Sélectionner --</option>
                    <option value="mode">Mode</option>
                    <option value="electronique">Électronique</option>
                    <option value="maison">Maison</option>
                    <option value="sports">Sports</option>
                    <option value="beaute">Beauté</option>
                    <option value="livres">Livres</option>
                    <option value="jouets">Jouets</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                  <input
                    type="text"
                    placeholder="Ex: Neuf, Comme neuf"
                    value={form.condition}
                    onChange={(e) => setForm({ ...form, condition: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  placeholder="Décrivez votre produit..."
                  rows={6}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix *</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Devise *</label>
                  <select
                    value={form.currency}
                    onChange={(e) => setForm({ ...form, currency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Devise</option>
                    <option value="FCFA">FCFA</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Localisation *</label>
                  <input
                    type="text"
                    placeholder="Ex: Cotonou, Bénin"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-gray-600">
                <Info className="w-4 h-4" />
                <span>Cette page est une démo front uniquement; aucune donnée n'est envoyée.</span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800">Annuler</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold">Publier</button>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
