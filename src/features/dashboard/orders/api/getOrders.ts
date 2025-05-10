import { Order, OrderFilter, OrderStatus } from "@/types/order";

const orders: Order[] = [
  {
    id: "ORD001",
    customerId: "CUS001",
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@example.com",
    customerPhone: "0987654321",
    items: [
      {
        id: "ITEM001",
        productId: "1",
        name: "Bánh Mỳ Que Sốt Bơ Trứng Gà Xé",
        price: 13000,
        quantity: 2,
        image: "https://product.hstatic.net/1000104153/product/banh_my_que_sot_bo_trung_ga_xe_d48dcc49160d405c80d31cd221e40b7a_grande.jpg"
      },
      {
        id: "ITEM002",
        productId: "8",
        name: "Tiramisu Cake Piece",
        price: 35000,
        quantity: 1,
        image: "https://product.hstatic.net/1000104153/product/tiramisu_cake_8265d99db2f74e528f5656dd81d9cab3_grande.jpg"
      }
    ],
    totalAmount: 61000,
    status: "completed",
    paymentMethod: "cash",
    shippingAddress: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    createdAt: "2023-11-15T08:30:00Z",
    updatedAt: "2023-11-15T10:15:00Z"
  },
  {
    id: "ORD002",
    customerId: "CUS002",
    customerName: "Trần Thị B",
    customerEmail: "tranthib@example.com",
    customerPhone: "0901234567",
    items: [
      {
        id: "ITEM003",
        productId: "11",
        name: "Hawaii mousse",
        price: 295000,
        quantity: 1,
        image: "https://product.hstatic.net/1000104153/product/hawaii_mousse_0b7634f35012441cacaf833c24b4a793_grande.png"
      }
    ],
    totalAmount: 295000,
    status: "delivered",
    paymentMethod: "credit_card",
    shippingAddress: "456 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
    createdAt: "2023-11-16T14:20:00Z",
    updatedAt: "2023-11-16T16:45:00Z"
  },
  {
    id: "ORD003",
    customerId: "CUS003",
    customerName: "Lê Văn C",
    customerEmail: "levanc@example.com",
    customerPhone: "0912345678",
    items: [
      {
        id: "ITEM004",
        productId: "2",
        name: "White cheese and caramel cake",
        price: 325000,
        quantity: 1,
        image: "https://product.hstatic.net/1000104153/product/white_cheese_and_caramel_cake_2024_00779bd73b1e4e73b1f987fc1c3d148f_grande.jpg"
      },
      {
        id: "ITEM005",
        productId: "7",
        name: "Bánh Cuộn Ruốc",
        price: 20000,
        quantity: 3,
        image: "https://product.hstatic.net/1000104153/product/banh_cuon_1_1_f8db073077c241ee856610937a97180b_grande.jpg"
      }
    ],
    totalAmount: 385000,
    status: "processing",
    paymentMethod: "bank_transfer",
    shippingAddress: "789 Đường Phạm Ngọc Thạch, Quận 3, TP. Hồ Chí Minh",
    createdAt: "2023-11-18T09:10:00Z",
    updatedAt: "2023-11-18T09:15:00Z"
  },
  {
    id: "ORD004",
    customerId: "CUS004",
    customerName: "Phạm Thị D",
    customerEmail: "phamthid@example.com",
    customerPhone: "0978123456",
    items: [
      {
        id: "ITEM006",
        productId: "12",
        name: "Bánh Croissant",
        price: 16000,
        quantity: 5,
        image: "https://product.hstatic.net/1000104153/product/banh_croissant_48cb95788ca14f08bd311bb0caf5b2b7_grande.jpg"
      }
    ],
    totalAmount: 80000,
    status: "pending",
    paymentMethod: "cash",
    shippingAddress: "101 Đường Võ Văn Tần, Quận 3, TP. Hồ Chí Minh",
    createdAt: "2023-11-20T16:05:00Z"
  },
  {
    id: "ORD005",
    customerId: "CUS005",
    customerName: "Hoàng Văn E",
    customerEmail: "hoangvane@example.com",
    customerPhone: "0939876543",
    items: [
      {
        id: "ITEM007",
        productId: "9",
        name: "Bánh ốc quế kem",
        price: 15000,
        quantity: 10,
        image: "https://product.hstatic.net/1000104153/product/banh_oc_que_kem_80404fd5a8ca49a0b0a1d8cd652492a5_grande.jpg"
      },
      {
        id: "ITEM008",
        productId: "10",
        name: "Choux Cream",
        price: 30000,
        quantity: 2,
        image: "https://product.hstatic.net/1000104153/product/su_kem_tron1_222e84c81db048c5a7e833f3e718c744_grande.jpg"
      }
    ],
    totalAmount: 210000,
    status: "cancelled",
    paymentMethod: "credit_card",
    shippingAddress: "202 Đường Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh",
    createdAt: "2023-11-22T10:30:00Z",
    updatedAt: "2023-11-22T11:20:00Z",
    notes: "Khách hàng hủy vì thay đổi kế hoạch"
  }
];

export const getAllOrders = (): Order[] => {
  return orders;
};

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const getOrdersByStatus = (status: OrderStatus): Order[] => {
  return orders.filter(order => order.status === status);
};

export const getOrdersByCustomerId = (customerId: string): Order[] => {
  return orders.filter(order => order.customerId === customerId);
};

export const filterOrders = (filter: OrderFilter): Order[] => {
  let filteredOrders = [...orders];

  if (filter.status) {
    filteredOrders = filteredOrders.filter(order => order.status === filter.status);
  }

  if (filter.customerId) {
    filteredOrders = filteredOrders.filter(order => order.customerId === filter.customerId);
  }

  if (filter.search) {
    const searchTerm = filter.search.toLowerCase();
    filteredOrders = filteredOrders.filter(order => 
      order.id.toLowerCase().includes(searchTerm) ||
      order.customerName.toLowerCase().includes(searchTerm) ||
      order.customerEmail.toLowerCase().includes(searchTerm) ||
      order.customerPhone.includes(searchTerm)
    );
  }

  if (filter.dateFrom) {
    const fromDate = new Date(filter.dateFrom);
    filteredOrders = filteredOrders.filter(order => new Date(order.createdAt) >= fromDate);
  }

  if (filter.dateTo) {
    const toDate = new Date(filter.dateTo);
    filteredOrders = filteredOrders.filter(order => new Date(order.createdAt) <= toDate);
  }

  if (filter.sortBy) {
    switch (filter.sortBy) {
      case 'date_asc':
        filteredOrders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'date_desc':
        filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'amount_asc':
        filteredOrders.sort((a, b) => a.totalAmount - b.totalAmount);
        break;
      case 'amount_desc':
        filteredOrders.sort((a, b) => b.totalAmount - a.totalAmount);
        break;
    }
  } else {
    // Default sort by date (newest first)
    filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return filteredOrders;
}; 