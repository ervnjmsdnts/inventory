import { User, UserRole } from "@prisma/client";

export type Category = {
  id: string;
  name: string;
  status: CategoryStatus;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  status: Status;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  status: Status;
  ingredients: number[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export type Order = {
  id: string;
  customerName: string;
  productId: number;
  numberOfItems: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export const CategoryStatus = {
  ONGOING: "ONGOING",
  STOPPED: "STOPPED",
};

export type CategoryStatus = typeof CategoryStatus[keyof typeof CategoryStatus];

export const Status = {
  AVAILABLE: "AVAILABLE",
  NOTAVAILABLE: "NOTAVAILABLE",
};

export type Status = typeof Status[keyof typeof Status];

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
  categoryId: number;
}

export interface IngredientModal {
  ingredient?: Ingredient | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  categories?: Category[];
}

export interface ProductIngredient extends Product {
  ingredient: Ingredient;
}

export interface ProductProps {
  products?: ProductIngredient[];
  ingredients?: Ingredient[];
}

export interface ProductInput {
  name: string;
  price: number;
  status: Status;
  ingredients: number[];
}

export interface ProductModal {
  product?: Product | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  ingredients?: Ingredient[];
}

export interface OrderProps {
  orders?: OrderProduct[];
  products?: Product[];
}

export interface OrderInput {
  customerName: string;
  productId: number;
  numberOfItems: number;
}

export interface OrderModal {
  order?: Order | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  products?: Product[];
}

export interface UserProps {
  users: User[];
}

export interface UserModal {
  user?: User | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export interface UserInput {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: UserRole;
}
