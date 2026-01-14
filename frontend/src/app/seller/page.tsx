import SellerHeader from "@/components/layout/SellerHeader";
import PromoBanner from "@/components/layout/PromoBanner";
import ProductGrid from "@/components/products/ProductGrid";
import Footer from "@/components/layout/Footer";
import { Product } from "@/types/product";

// Produits fictifs pour l'affichage
const fakeProducts: Product[] = [
  {
    id: "1",
    name: "Extensions de Cheveux",
    description: "1 - 9 pièce",
    price: 0,
    image: "https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=500&h=500&fit=crop",
    category: "beaute",
    stock: 10,
    seller: {
      id: "1",
      name: "monoshop"
    },
    createdAt: new Date()
  },
  {
    id: "2",
    name: "Mini crochet personnalisé bracelet sac à main pour les femmes décontracté Portable",
    description: "Neuf",
    price: 0,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop",
    category: "mode",
    stock: 5,
    seller: {
      id: "2",
      name: "Prety"
    },
    createdAt: new Date()
  },
  {
    id: "3",
    name: "Casque Audio Bluetooth Premium - Réduction de bruit",
    description: "Ex-stock",
    price: 0,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "electronique",
    stock: 8,
    seller: {
      id: "3",
      name: "TechStyle"
    },
    createdAt: new Date()
  },
  {
    id: "4",
    name: "Sneakers Sport Rouge Edition Limitée",
    description: "Pointure 42-44",
    price: 0,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    category: "sports",
    stock: 3,
    seller: {
      id: "4",
      name: "SportJn"
    },
    createdAt: new Date()
  }
];

export default function SellerPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <SellerHeader />

      {/* Banner promotionnel */}
      <PromoBanner />

      {/* Section Nouveautés */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nouveautés</h2>
          <ProductGrid products={fakeProducts} />
        </div>
      </section>

      {/* Section Vendez vos articles et Protection Acheteur */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vendez vos articles */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 rounded-full p-4 mb-4">
                  <svg className="w-12 h-12 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zM18.91 4.99l1.05 4.37c.1.42.01.84-.25 1.17-.14.18-.44.47-.94.47-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93-.01zM13 5h1.96l.54 4.52c.05.39-.07.78-.33 1.07-.22.26-.54.41-.95.41-.67 0-1.22-.59-1.22-1.31V5zM8.49 9.52L9.04 5H11v4.69c0 .72-.55 1.31-1.29 1.31-.34 0-.65-.15-.89-.41-.25-.29-.37-.68-.33-1.07zm-4.45-.16L5.05 5h1.97l-.58 4.86c-.08.65-.6 1.14-1.21 1.14-.49 0-.8-.29-.93-.47-.27-.32-.36-.75-.26-1.17zM6 19v-7.5c.67.19 1.42.29 2.18.29.87 0 1.63-.09 2.32-.29V19H6zm8.5 0v-7.5c.67.19 1.42.29 2.18.29.87 0 1.63-.09 2.32-.29V19h-4.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gérez votre boutique</h3>
                <p className="text-gray-600 mb-4">
                  Publiez vos articles et gérez vos ventes en toute simplicité.
                </p>
                <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                  Publier un article →
                </button>
              </div>
            </div>

            {/* Protection Acheteur */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 rounded-full p-4 mb-4">
                  <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Statistiques de vente</h3>
                <p className="text-gray-600 mb-4">
                  Suivez vos performances et optimisez vos ventes.
                </p>
                <button className="text-blue-500 font-semibold hover:text-blue-600 transition-colors">
                  Voir les stats →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
