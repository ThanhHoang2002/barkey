import { AboutSection } from "@/types/product";

export const getAboutInfo = (): AboutSection => {
  return {
    title: "Về chúng tôi",
    content: "Có lẽ những người yêu thích bánh ngọt, đặc biệt là bánh được làm theo phong cách Pháp không xa lạ gì với thương hiệu Cosmo Bakery.\n\nMỗi chiếc bánh ở Cosmo Bakery lại mang một vẻ riêng, từ hương vị đến cách trang trí. Hình thức giản dị chỉ với hai màu đen trắng làm chủ đạo nhưng chất lượng nhờ cách làm tinh tế và tỉ mỉ. Bánh có vị ngọt không quá đậm, vị béo thì thanh nên không gây cảm giác ngán cho người thưởng thức.\n\nHơn nữa, ông chủ của tiệm bánh, Chef Đức Cường, cũng là người khá khó tính trong việc lựa chọn nguyên liệu cho các sản phẩm của cửa hàng.",
    image: "https://theme.hstatic.net/1000104153/1001164818/14/home_about_image.jpg?v=176",
    link: "/about",
    linkText: "Xem thêm"
  };
}; 