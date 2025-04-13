import { Link } from 'react-router-dom';

import { Category } from '@/types/product';

interface CategoryGridProps {
  categories: Category[];
}

export const CategoryGrid = ({ categories }: CategoryGridProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={category.image || 'https://placehold.co/400x300/e2e8f0/64748b?text=Category'}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all group-hover:bg-black/50">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white md:text-2xl">{category.name}</h3>
                  {category.description && (
                    <p className="mt-2 hidden text-sm text-white/80 md:block">{category.description}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}; 