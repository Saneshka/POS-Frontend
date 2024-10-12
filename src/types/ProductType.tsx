import CategoryType from "./CategoryType";

interface ProductType {
  productId: number;
  productName: string;
  price: number;
  description: string;
  qty: number;
  category: CategoryType;
}

export default ProductType;
