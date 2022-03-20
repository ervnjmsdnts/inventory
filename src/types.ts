import { Order, Product } from "@prisma/client";

interface OrderProduct extends Order {
  product: Product;
}

export interface SalesProps {
  orders: OrderProduct[];
}

export interface SalesData {
  date: string;
  total: number;
}
