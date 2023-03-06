export type Menu = { id: number; name: string };

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type BasketProduct = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

export type Discount = {
  name: string;
  discount: number;
};
