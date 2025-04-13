import { Category } from "@/types/product";

export const getCategories = (): Category[] => {
  return [
    {
      id: '1',
      name: 'Bánh sinh nhật',
      slug: 'banh-sinh-nhat',
      description: 'Bánh sinh nhật đa dạng kích thước và hương vị',
      image: 'https://theme.hstatic.net/1000104153/1001164818/14/home_category_2_banner.jpg?v=176'
    },
    {
      id: '2',
      name: 'Bánh tươi',
      slug: 'banh-tuoi-hang-ngay',
      description: 'Bánh tươi được làm hàng ngày',
      image: 'https://theme.hstatic.net/1000104153/1001164818/14/home_category_3_banner.jpg?v=176'
    },
    {
      id: '3',
      name: 'Bánh miếng nhỏ',
      slug: 'banh-mieng-nho',
      description: 'Bánh miếng nhỏ thích hợp cho tiệc và văn phòng',
      image: 'https://theme.hstatic.net/1000104153/1001164818/14/home_category_4_banner.jpg?v=176'
    }
  ];
}; 