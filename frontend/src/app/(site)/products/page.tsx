import ProductGrid from '@/components/products/ProductGrid';
import { Product } from '@/types/product';

// Données de démo
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Produit exemple 1',
    description: 'Description du produit',
    price: 29.99,
    image: '/placeholder.jpg',
    category: 'Électronique',
    stock: 10,
    seller: { id: '1', name: 'Vendeur 1' },
    createdAt: new Date()
  },
  // Ajoutez plus de produits ici
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Produits</h1>
      <ProductGrid products={mockProducts} />
    </div>
  );
}
