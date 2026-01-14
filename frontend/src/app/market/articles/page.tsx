import MarketHeader from '@/components/layout/MarketHeader';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/types/product';

// Produits mis en avant (aléatoires)
const randomProducts: Product[] = [
  {
    id: '1',
    name: 'Casque Audio Bluetooth Premium',
    description: 'Réduction de bruit active',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'electronique',
    stock: 8,
    seller: {
      id: '1',
      name: 'TechStore',
    },
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Sneakers Sport Edition Limitée',
    description: 'Pointure 42-44',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'sports',
    stock: 3,
    seller: {
      id: '2',
      name: 'SportHub',
    },
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Sac à Main Cuir Premium',
    description: 'Neuf avec étiquette',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=500&fit=crop',
    category: 'mode',
    stock: 5,
    seller: {
      id: '3',
      name: 'Fashion Hub',
    },
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Montre Connectée Smartwatch',
    description: 'Neuf - Garantie 1 an',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'electronique',
    stock: 12,
    seller: {
      id: '4',
      name: 'TechPro',
    },
    createdAt: new Date(),
  },
  {
    id: '5',
    name: 'Lunettes de Soleil Ray-Ban',
    description: 'Authentiques avec certificat',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    category: 'mode',
    stock: 7,
    seller: {
      id: '5',
      name: 'Style Shop',
    },
    createdAt: new Date(),
  },
  {
    id: '6',
    name: 'PlayStation 5 Console',
    description: 'Neuf - Garantie constructeur',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=500&fit=crop',
    category: 'electronique',
    stock: 2,
    seller: {
      id: '6',
      name: 'GameZone',
    },
    createdAt: new Date(),
  },
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MarketHeader />

      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Nouveaux Articles</h1>
        <ProductGrid products={randomProducts} />
      </main>

      <Footer />
    </div>
  );
}
