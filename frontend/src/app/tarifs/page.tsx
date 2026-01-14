import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function TarifsPage() {
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/assets/Background_v2.jpg')",
        backgroundPosition: 'center',
        backgroundSize: '40%',
        backgroundRepeat: 'repeat',
      }}
    >
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Colonne gauche - Essai Gratuit */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-md sticky top-24">
              <div className="bg-blue-600 text-white text-center py-2 px-4 rounded-lg mb-4">
                <span className="font-bold">6 mois gratuits</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Essaie Gratuit</h2>

              <div className="space-y-4 mb-6">
                <p className="text-sm font-semibold text-gray-700">Avantages :</p>
                
                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <p className="text-sm text-gray-700">Jusqu'à 100 articles publiables</p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <p className="text-sm text-gray-700">10 photos par article</p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <p className="text-sm text-gray-700">Accès limité aux vidéos</p>
                </div>
              </div>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors">
                Choisir cette offre
              </button>
            </div>
          </div>

          {/* Colonnes droite - Offres Premium */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Offre 1 */}
              <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center justify-center text-center h-80">
                <h3 className="text-2xl font-bold text-white">Bientôt disponible</h3>
              </div>

              {/* Offre 2 */}
              <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center justify-center text-center h-80">
                <h3 className="text-2xl font-bold text-white">Bientôt disponible</h3>
              </div>

              {/* Offre 3 */}
              <div className="bg-gray-800 rounded-lg p-8 flex flex-col items-center justify-center text-center h-80">
                <h3 className="text-2xl font-bold text-white">Bientôt disponible</h3>
              </div>
            </div>

            {/* Bouton Continuer sans souscrire */}
            <div className="mt-8 text-center">
              <Link 
                href="/"
                className="inline-block text-gray-700 hover:text-gray-900 font-medium text-lg underline transition-colors"
              >
                Continuer sans souscrire
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
