import { motion } from 'framer-motion';
import React from 'react';

import { Image } from '@/components/ui/image';

const AboutPage: React.FC = () => {
  return (
    <motion.div className="bg-background py-12 md:py-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex text-sm">
            <a href="/" className="text-muted-foreground hover:text-foreground">
              Trang chủ
            </a>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="font-medium text-foreground">Giới thiệu</span>
          </nav>
        </div>

        {/* Page Title */}
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">Giới thiệu</h1>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <p className="mb-6">
            Có lẽ những người yêu thích bánh ngọt, đặc biệt là bánh được làm theo phong cách Pháp không xa lạ gì với thương hiệu Cosmo Bakery.
          </p>

          <p className="mb-6">
            Mỗi chiếc bánh ở Cosmo Bakery lại mang một vẻ riêng, từ hương vị đến cách trang trí. Hình thức giản dị chỉ với hai màu đen trắng làm chủ đạo nhưng chất lượng nhờ cách làm tinh tế và tỉ mỉ. Bánh có vị ngọt không quá đậm, vị béo thì thanh nên không gây cảm giác ngán cho người thưởng thức. Cũng rất hiếm khi tìm thấy sự trùng lặp trong các loại bánh ở Cosmo Bakery vì tất cả chúng, từ bánh mì, bánh ngọt, bánh quy đều được làm 100% hand-made.
          </p>

          <p className="mb-6">
            Hơn nữa, ông chủ của tiệm bánh, Chef Đức Cường, cũng là người khá khó tính trong việc lựa chọn nguyên liệu cho các sản phẩm của cửa hàng.
          </p>

          <div className="my-10 rounded-lg bg-gray-50 p-8 shadow-sm">
            <Image 
              src="https://theme.hstatic.net/1000104153/1001164818/14/home_about_image.jpg?v=176" 
              alt="Chef Đức Cường" 
              className="mx-auto mb-6 rounded-lg shadow-md" 
              containerClassName="mx-auto mb-6 rounded-lg shadow-md aspect-[16/9]"
            />
          </div>

          <p className="mb-6">
            Xuất thân trong gia đình có nghề làm bánh mỳ truyền thống, Chef Đức Cường cũng có thời gian dài làm việc tại Công ty Bodega rồi Sofitel Metropole. Anh có hơn 10 năm kinh nghiệm làm Chef bánh tại khách sạn danh tiếng Sofitel Metropole Legende Hanoi.
          </p>

          <p className="mb-6">
            Và cũng chính ông chủ Đức Cường vẫn tự tay làm ra những chiếc bánh ngọt độc đáo. Bên cạnh việc kinh doanh, với ông chủ trẻ này thì &ldquo;làm bánh là một nghệ thuật đầy sáng tạo, được thể hiện cầu kỳ và nghiêm ngặt từ khâu chế biến cho đến việc trang trí, trình bày các họa tiết&rdquo;. Mỗi chiếc bánh được anh làm ra đều thỏa mãn hai ước mơ: nghệ thuật và kinh doanh.
          </p>

          <p className="mb-6">
            Đến nay Cosmo Bakery đã phát triển với một chuỗi cửa hàng tại Hà Nội, Hải Phòng, Bắc Ninh, Hưng Yên. Mỗi nơi có một phong cách, một ấn tượng riêng nhưng tất cả đều hướng tới một điều là chất lượng và trang nhã.
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-12 rounded-lg bg-primary/5 p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">CÔNG TY CỔ PHẦN DỊCH VỤ THƯƠNG MẠI SẢN XUẤT SHT</h2>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Số 15, hẻm 76 ngách 51, ngõ Linh Quang, phường Văn Chương, quận Đống Đa, Hà Nội</span>
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>02438222228</span>
            </li>
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@duccuong.vn</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage; 