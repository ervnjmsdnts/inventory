import {
  Category,
  CategoryStatus,
  Ingredient,
  Order,
  Product,
  Status,
} from "@prisma/client";

interface OrderProduct extends Order {
  product: Product;
}

export interface SalesData {
  date: string;
  total: number;
}

export interface CategoryProps {
  categories: Category[];
}

export interface CategoryInput {
  name: string;
  status: CategoryStatus;
}

export interface CategoryModal {
  category?: Category | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export interface IngredientCategory extends Ingredient {
  Category: Category;
}

export interface IngredientProps {
  ingredients?: IngredientCategory[];
  categories?: Category[];
}

export interface IngredientInput {
  name: string;
  quantity: number;
  status: Status;
  categoryId: string;
}

export interface IngredientModal {
  ingredient?: Ingredient | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  categories?: Category[];
}

export interface ProductProps {
  products: Product[];
}

export interface ProductInput {
  name: string;
  price: number;
  status: Status;
}

export interface ProductModal {
  product?: Product | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export interface OrderProps {
  orders?: OrderProduct[];
  products?: Product[];
}

export interface OrderInput {
  customerName: string;
  productId: string;
  numberOfItems: number;
}

export interface OrderModal {
  order?: Order | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  products?: Product[];
}
