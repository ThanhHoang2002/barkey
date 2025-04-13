import { Banner } from "@/types/product";

export const getBanners = (): Banner[] => {
  return [
    {
      id: '1',
      title: 'Bánh sinh nhật',
      subtitle: 'Đa dạng mẫu mã, hương vị đặc biệt',
      image: 'https://theme.hstatic.net/1000104153/1001164818/14/slideshow_1.jpg?v=176',
      link: '/categories/banh-sinh-nhat'
    },
    {
      id: '2',
      title: 'Bánh ngọt và bánh mỳ',
      subtitle: 'Được làm từ các nguyên liệu tốt nhất',
      image: 'https://theme.hstatic.net/1000104153/1001164818/14/slideshow_3.jpg?v=176',
      link: '/products'
    },
    {
      id: '3',
      title: 'Đặt hàng trực tuyến',
      subtitle: 'Giao hàng tận nơi trong vòng 2 giờ',
      image: 'https://theme.hstatic.net/1000104153/1001164818/14/slideshow_2.jpg?v=176',
      link: '/contact'
    }
  ];
}; 