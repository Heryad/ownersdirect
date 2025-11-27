import { Metadata } from 'next';
import { getProperty } from '@/actions/properties';
import PropertyDetailsClient from '@/components/property/PropertyDetailsClient';

interface Props {
  params: {
    id: string;
  };
}

// Helper to map data
const mapPropertyData = (data: any) => {
  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    price: data.price.toLocaleString(),
    type: data.type,
    location: data.location,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    area: data.area,
    parking: data.parking,
    propertyType: data.property_type,
    yearBuilt: data.year_built,
    availableFrom: data.available_from,
    furnished: data.furnished,
    images: data.images || [],
    amenities: (data.amenities || []).map((name: string) => {
      const iconKey = name.toLowerCase().replace(/\s+/g, '');
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        iconName: iconKey,
        available: true,
      };
    }),
    broker: {
      name: data.profiles?.full_name || 'Property Owner',
      role: data.profiles?.role || 'Owner',
      image: data.profiles?.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      phone: data.profiles?.phone || '',
      email: data.profiles?.email || '',
      whatsapp: data.profiles?.whatsapp || '',
      rating: 5.0,
      propertiesListed: 1,
      verified: data.profiles?.is_verified || false,
    },
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const response = await getProperty(id);

  if (!response.property) {
    return {
      title: 'Property Not Found | OwnersDirect',
    };
  }

  const title = `${response.property.title} | OwnersDirect`;
  const description = `${response.property.bedrooms} bed, ${response.property.bathrooms} bath ${response.property.property_type} for ${response.property.type} in ${response.property.location}. ${response.property.description?.substring(0, 150)}...`;
  const image = response.property.images?.[0] || '/og-image.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: response.property.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const data = await getProperty(id);
  const property = mapPropertyData(data.property);

  return <PropertyDetailsClient property={property} />;
}
