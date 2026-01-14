import Link from 'next/link';

const categories = [
  { id: '1', name: 'Électronique', slug: 'electronique' },
  { id: '2', name: 'Mode', slug: 'mode' },
  { id: '3', name: 'Maison', slug: 'maison' },
  { id: '4', name: 'Sports', slug: 'sports' },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catégories</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {category.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
