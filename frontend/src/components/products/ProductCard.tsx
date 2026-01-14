"use client";

import { useState } from 'react';
import type React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setLiked((prev) => !prev);
  };

  const handleShare = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const url = `${window.location.origin}/products/${product.id}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Share failed', error);
    }
  };

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
        <div className="relative h-56 w-full bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
          {product.stock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Rupture
            </div>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 h-10">
            {product.name}
          </h3>
          
          <p className="text-xs text-gray-500 mb-2">
            {product.price > 0 ? `${product.price} - ${product.price + 10} pièce` : '1 - 9 pièce'}
          </p>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">{product.seller.name}</span>
          </div>
          
          <div className="flex items-center text-xs text-gray-500">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Cotonou</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleLike}
              className="flex items-center gap-1 rounded-full border border-gray-200 px-2 py-1 text-gray-700 hover:border-red-500 hover:text-red-500"
              aria-pressed={liked}
            >
              <svg
                className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M12 21s-6.75-4.35-9-9c-1.2-2.55.15-6 3.45-6C8.25 6 9.75 8.25 12 9c2.25-.75 3.75-3 5.55-3 3.3 0 4.65 3.45 3.45 6-2.25 4.65-9 9-9 9Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{liked ? 'Aimé' : 'J\u2019aime'}</span>
            </button>

            <div className="flex items-center gap-2">
              {copied && <span className="text-green-600">Lien copié</span>}
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1 rounded-full border border-gray-200 px-2 py-1 text-gray-700 hover:border-blue-500 hover:text-blue-500"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 12l-3 3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 12l-3-3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 9V7a2 2 0 012-2h8a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 15v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
