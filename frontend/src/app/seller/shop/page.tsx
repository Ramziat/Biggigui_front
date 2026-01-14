import SellerHeader from '@/components/layout/SellerHeader';
import Footer from '@/components/layout/Footer';

export default function SellerShopPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SellerHeader />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Ma Boutique</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-gray-600">Gérez votre boutique et vos produits ici.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
