import ProductType from "./ProductType";

interface OrderType {
  id: number;
  totalPrice: number;
  orderDateTime: Date;
  orderedProducts: ProductType[];
}

export default OrderType;
