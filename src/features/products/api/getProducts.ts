import { Product, ProductListType } from '@/types/product';

const products: Product[] = [
  {
    id: '1',
    name: 'Bánh Mỳ Que Sốt Bơ Trứng Gà Xé',
    slug: 'banh-my-que-sot-bo-trung-ga-xe',
    price: 13000,
    image: 'https://product.hstatic.net/1000104153/product/banh_my_que_sot_bo_trung_ga_xe_d48dcc49160d405c80d31cd221e40b7a_grande.jpg',
    category: { id: '4', name: 'Bánh mỳ', slug: 'banh-my' },
    isNew: true
  },
  {
    id: '2',
    name: 'White cheese and caramel cake',
    slug: 'white-cheese-and-caramel-cake',
    price: 325000,
    image: 'https://product.hstatic.net/1000104153/product/white_cheese_and_caramel_cake_2024_00779bd73b1e4e73b1f987fc1c3d148f_grande.jpg',
    category: { id: '1', name: 'Bánh sinh nhật', slug: 'banh-sinh-nhat' },
    isNew: true
  },
  {
    id: '3',
    name: 'Floss Pork Bread',
    slug: 'floss-pork-bread',
    price: 12000,
    image: 'https://product.hstatic.net/1000104153/product/floss_pork_bread_ad4edc79b1f847c595eaf84f3f08f9b8_grande.jpg',
    category: { id: '4', name: 'Bánh mỳ', slug: 'banh-my' },
    isNew: true
  },
  {
    id: '4',
    name: 'Coconut Mochi',
    slug: 'coconut-mochi',
    price: 15000,
    image: 'https://product.hstatic.net/1000104153/product/coconut_mochi_7ae13e9eb4cc4ff5b5370d5f02a33d9a_grande.jpg',
    category: { id: '4', name: 'Bánh mỳ', slug: 'banh-my' },
    isNew: true
  },
  {
    id: '5',
    name: 'Banana Cheese Cake',
    slug: 'banana-cheese-cake',
    price: 35000,
    image: 'https://product.hstatic.net/1000104153/product/banana_cheese_cake_0c963127abab4017a9c145b4d6476055_grande.jpg',
    category: { id: '4', name: 'Bánh mỳ', slug: 'banh-my' },
    isNew: true
  },
  {
    id: '6',
    name: 'Flan Pudding Chocolate',
    slug: 'flan-pudding-chocolate',
    price: 15000,
    image: 'https://product.hstatic.net/1000104153/product/flan_pudding_chocolate_2746e93548334140aa616e258d2e30fa_grande.jpg',
    category: { id: '4', name: 'Bánh mỳ', slug: 'banh-my' },
    isNew: true
  },
  {
    id: '7',
    name: 'Bánh Cuộn Ruốc',
    slug: 'banh-cuon-ruoc',
    price: 20000,
    image: 'https://product.hstatic.net/1000104153/product/banh_cuon_1_1_f8db073077c241ee856610937a97180b_grande.jpg',
    category: { id: '4', name: 'Bánh mỳ', slug: 'banh-my' },
    isBestSeller: true
  },
  {
    id: '8',
    name: 'Tiramisu Cake Piece',
    slug: 'tiramissu-cake-piece',
    price: 35000,
    image: 'https://product.hstatic.net/1000104153/product/tiramisu_cake_8265d99db2f74e528f5656dd81d9cab3_grande.jpg',
    category: { id: '6', name: 'Bánh miếng nhỏ', slug: 'banh-mieng-nho' },
    isBestSeller: true
  },
  {
    id: '9',
    name: 'Bánh ốc quế kem',
    slug: 'banh-oc-que-kem',
    price: 15000,
    image: 'https://product.hstatic.net/1000104153/product/banh_oc_que_kem_80404fd5a8ca49a0b0a1d8cd652492a5_grande.jpg',
    category: { id: '6', name: 'Bánh miếng nhỏ', slug: 'banh-mieng-nho' },
    isBestSeller: true
  },
  {
    id: '10',
    name: 'Choux Cream',
    slug: 'choux-cream',
    price: 30000,
    image: 'https://product.hstatic.net/1000104153/product/su_kem_tron1_222e84c81db048c5a7e833f3e718c744_grande.jpg',
    category: { id: '6', name: 'Bánh miếng nhỏ', slug: 'banh-mieng-nho' },
    isBestSeller: true
  },
  {
    id: '11',
    name: 'Hawaii mousse',
    slug: 'hawaii-mousse',
    price: 295000,
    image: 'https://product.hstatic.net/1000104153/product/hawaii_mousse_0b7634f35012441cacaf833c24b4a793_grande.png',
    category: { id: '1', name: 'Bánh sinh nhật', slug: 'banh-sinh-nhat' },
    isBestSeller: true
  },
  {
    id: '12',
    name: 'Bánh Croissant',
    slug: 'banh-croissant',
    price: 16000,
    image: 'https://product.hstatic.net/1000104153/product/banh_croissant_48cb95788ca14f08bd311bb0caf5b2b7_grande.jpg',
    category: { id: '4', name: 'Bánh mỳ', slug: 'banh-my' },
    isBestSeller: true
  }
];

export const getProductsByType = (type: ProductListType): Product[] => {
  switch(type) {
    case 'new':
      return products.filter(product => product.isNew);
    case 'bestseller':
      return products.filter(product => product.isBestSeller);
    default:
      return products.slice(0, 6);
  }
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category.id === categoryId);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getAllProducts = (): Product[] => {
  return products;
}; 