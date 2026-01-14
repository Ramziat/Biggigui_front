'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const banners = [
  {
    id: 1,
    title: "Offre spéciale fin d'année",
    description: "Profitez d'un Noël anticipé avec Biggigui. Jusqu'à 100% de réduction sur tous vos achats à partir de 50€. N'attendez pas !",
    bgColor: "bg-gradient-to-r from-red-600 to-red-700",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Livraison gratuite à partir de 49 €",
    description: "Livraison gratuite après un achat de 20 € sur la market place. Offre limitée à 100 achats ou ventes sur la plateforme.",
    bgColor: "bg-gradient-to-r from-blue-600 to-blue-700",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea3c1c1e?w=1200&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Nouveaux produits chaque jour",
    description: "Découvrez des milliers de produits ajoutés quotidiennement par nos vendeurs de confiance.",
    bgColor: "bg-gradient-to-r from-green-600 to-green-700",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=300&fit=crop"
  }
];

export default function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Disparition
      setIsVisible(false);
      
      // Changement de bannière après la disparition
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
        // Réapparition
        setIsVisible(true);
      }, 500); // Temps de disparition
    }, 4000); // Change toutes les 4 secondes

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsVisible(true);
    }, 500);
  };

  const currentBanner = banners[currentIndex];

  return (
    <section className="bg-gray-50 py-4">
      <div className="mx-auto px-4" style={{ maxWidth: '98%' }}>
        {/* Card avec effet de disparition/apparition */}
        <div
          className={`${currentBanner.bgColor} rounded-xl shadow-lg overflow-hidden transition-all duration-500 transform relative h-36 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Image de fond */}
          <div className="absolute inset-0 opacity-30">
            <Image
              src={currentBanner.image}
              alt={currentBanner.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Contenu avec overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative h-full text-white text-center px-8 py-6 flex flex-col justify-center items-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {currentBanner.title}
            </h2>
            <p className="text-sm md:text-base mb-4 max-w-3xl">
              {currentBanner.description}
            </p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-50 transition-colors shadow-lg">
              Découvrir
            </button>
          </div>
        </div>

        {/* Indicateurs de pagination */}
        <div className="flex justify-center space-x-2 mt-4">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400 w-2.5'
              }`}
              aria-label={`Aller à la bannière ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
