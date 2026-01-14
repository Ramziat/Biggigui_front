import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2c3e50] text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À Propos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">À Propos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/qui-sommes-nous" className="text-gray-300 hover:text-white text-sm">
                  Qui sommes-nous ?
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Aide & Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Aide & Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/service-client" className="text-gray-300 hover:text-white text-sm">
                  Service Client
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Vendre sur MarketPlace */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Vendre sur MarketPlace</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/inscription" className="text-gray-300 hover:text-white text-sm">
                  Devenir acheteur
                </Link>
              </li>
              <li>
                <Link href="/portail-vendeur" className="text-gray-300 hover:text-white text-sm">
                  Devenir vendeur
                </Link>
              </li>
              <li>
                <Link href="/tarifs" className="text-gray-300 hover:text-white text-sm">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Légal */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/condition-generale" className="text-gray-300 hover:text-white text-sm">
                  Conditions Générales
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2026 Biggigui. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
