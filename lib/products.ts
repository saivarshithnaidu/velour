export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'TOPS' | 'BOTTOMS' | 'DRESSES' | 'OUTERWEAR' | 'ACCESSORIES';
  price: number;
  currency: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  details: string[];
  images: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'The Noir Dress',
    slug: 'the-noir-dress',
    category: 'DRESSES',
    price: 285,
    currency: '£',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Ivory', hex: '#F5F0E8' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A sculptural silhouette crafted from heavyweight Japanese crepe. Falls to mid-calf with architectural seam detailing. Fully lined.',
    details: [
      '100% Japanese Crepe',
      'Fully lined in silk',
      'Concealed side zip',
      'Mid-calf length',
      'Dry clean only',
      'Made in Italy',
    ],
    images: ['/images/products/noir-dress-1.jpg', '/images/products/noir-dress-2.jpg', '/images/products/noir-dress-3.jpg'],
  },
  {
    id: '2',
    name: 'The Minimal Blazer',
    slug: 'the-minimal-blazer',
    category: 'OUTERWEAR',
    price: 420,
    currency: '£',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Camel', hex: '#C4A882' },
      { name: 'Grey', hex: '#6B6B6B' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Deconstructed single-breasted blazer with a relaxed shoulder. Crafted from Italian wool with horn button detailing.',
    details: [
      '100% Italian Wool',
      'Half canvas construction',
      'Horn buttons',
      'Two front pockets',
      'Internal pocket',
      'Made in Italy',
    ],
    images: ['/images/products/blazer-1.jpg', '/images/products/blazer-2.jpg', '/images/products/blazer-3.jpg'],
  },
  {
    id: '3',
    name: 'The Silk Slip',
    slug: 'the-silk-slip',
    category: 'DRESSES',
    price: 195,
    currency: '£',
    colors: [
      { name: 'Cream', hex: '#F5F0E8' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Dusty Rose', hex: '#C9A0A0' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Bias-cut slip dress in washed silk charmeuse. Adjustable spaghetti straps with a cowl neckline.',
    details: [
      '100% Silk Charmeuse',
      'Bias cut',
      'Adjustable straps',
      'Cowl neckline',
      'Hand wash cold',
      'Made in France',
    ],
    images: ['/images/products/silk-slip-1.jpg', '/images/products/silk-slip-2.jpg', '/images/products/silk-slip-3.jpg'],
  },
  {
    id: '4',
    name: 'The Wide Leg Trouser',
    slug: 'the-wide-leg-trouser',
    category: 'BOTTOMS',
    price: 175,
    currency: '£',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Ivory', hex: '#F5F0E8' },
      { name: 'Olive', hex: '#5C5C3D' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'High-waisted wide-leg trousers with pressed center crease. Clean front with side zip closure.',
    details: [
      '70% Wool, 30% Polyester',
      'High waisted',
      'Wide leg',
      'Pressed crease',
      'Side zip',
      'Made in Portugal',
    ],
    images: ['/images/products/trouser-1.jpg', '/images/products/trouser-2.jpg', '/images/products/trouser-3.jpg'],
  },
  {
    id: '5',
    name: 'The Linen Shirt',
    slug: 'the-linen-shirt',
    category: 'TOPS',
    price: 125,
    currency: '£',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Sand', hex: '#D4C5A9' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Oversized linen shirt with a relaxed collar and curved hem. Mother-of-pearl buttons throughout.',
    details: [
      '100% European Linen',
      'Oversized fit',
      'Mother-of-pearl buttons',
      'Curved hem',
      'Machine wash cold',
      'Made in Italy',
    ],
    images: ['/images/products/linen-shirt-1.jpg', '/images/products/linen-shirt-2.jpg', '/images/products/linen-shirt-3.jpg'],
  },
  {
    id: '6',
    name: 'The Cashmere Turtleneck',
    slug: 'the-cashmere-turtleneck',
    category: 'TOPS',
    price: 245,
    currency: '£',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Cream', hex: '#F5F0E8' },
      { name: 'Burgundy', hex: '#6B2D3E' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Fine-gauge cashmere turtleneck with ribbed cuffs and hem. Seamless construction for a clean finish.',
    details: [
      '100% Grade-A Mongolian Cashmere',
      'Fine gauge knit',
      'Ribbed cuffs and hem',
      'Seamless construction',
      'Hand wash or dry clean',
      'Made in Scotland',
    ],
    images: ['/images/products/cashmere-1.jpg', '/images/products/cashmere-2.jpg', '/images/products/cashmere-3.jpg'],
  },
  {
    id: '7',
    name: 'The Leather Trench',
    slug: 'the-leather-trench',
    category: 'OUTERWEAR',
    price: 680,
    currency: '£',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Tan', hex: '#B08B5B' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Full-length leather trench coat in butter-soft nappa leather. Double-breasted with storm flap and belt.',
    details: [
      '100% Nappa Leather',
      'Silk lining',
      'Double-breasted',
      'Storm flap',
      'Self-belt',
      'Made in Italy',
    ],
    images: ['/images/products/leather-trench-1.jpg', '/images/products/leather-trench-2.jpg', '/images/products/leather-trench-3.jpg'],
  },
  {
    id: '8',
    name: 'The Wrap Skirt',
    slug: 'the-wrap-skirt',
    category: 'BOTTOMS',
    price: 145,
    currency: '£',
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Terracotta', hex: '#B5634B' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Asymmetric wrap skirt in structured cotton-linen. Ties at the waist with a clean drape.',
    details: [
      '60% Cotton, 40% Linen',
      'Wrap construction',
      'Self-tie waist',
      'Asymmetric hem',
      'Machine wash cold',
      'Made in Portugal',
    ],
    images: ['/images/products/wrap-skirt-1.jpg', '/images/products/wrap-skirt-2.jpg', '/images/products/wrap-skirt-3.jpg'],
  },
];

export const categories = ['ALL', 'TOPS', 'DRESSES', 'BOTTOMS', 'OUTERWEAR', 'ACCESSORIES'] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'ALL') return products;
  return products.filter((p) => p.category === category);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getRelatedProducts(currentSlug: string, count = 4): Product[] {
  const current = getProductBySlug(currentSlug);
  if (!current) return products.slice(0, count);
  const sameCategory = products.filter((p) => p.category === current.category && p.slug !== currentSlug);
  const others = products.filter((p) => p.category !== current.category);
  return [...sameCategory, ...others].slice(0, count);
}

// Mannequin section data
export const mannequinData: Record<string, { image: string; product: string; price: string }> = {
  TOPS: {
    image: '/images/mannequin/tops.jpg',
    product: 'THE LINEN SHIRT',
    price: '£125',
  },
  BOTTOMS: {
    image: '/images/mannequin/bottoms.jpg',
    product: 'THE WIDE LEG TROUSER',
    price: '£175',
  },
  DRESSES: {
    image: '/images/mannequin/dress.jpg',
    product: 'THE NOIR DRESS',
    price: '£285',
  },
  OUTERWEAR: {
    image: '/images/mannequin/coat.jpg',
    product: 'THE LEATHER TRENCH',
    price: '£680',
  },
  ACCESSORIES: {
    image: '/images/mannequin/accessories.jpg',
    product: 'THE LEATHER BELT',
    price: '£95',
  },
};
