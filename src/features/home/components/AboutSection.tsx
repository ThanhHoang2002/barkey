import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { AboutSection as AboutSectionType } from '@/types/product';

interface AboutSectionProps {
  data: AboutSectionType;
}

export const AboutSection = ({ data }: AboutSectionProps) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{data.title}</h2>
            <div className="mb-6 text-gray-700">
              {data.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
            {data.link && (
              <Link to={data.link}>
                <Button>{data.linkText || 'Xem thêm'}</Button>
              </Link>
            )}
          </div>
          <div className="order-1 lg:order-2">
            <Image
              src={data.image}
              alt={data.title}
              className="w-full rounded-lg object-cover shadow-md"
              containerClassName="w-full rounded-lg shadow-md aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}; 