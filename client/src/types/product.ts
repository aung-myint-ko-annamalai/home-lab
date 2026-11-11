export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  stock: number;
  sku: string | null;
  status: "draft" | "active" | "archived";
  isFeatured: boolean;
  categoryId: number | null;
  createdAt: string;
  updatedAt: string;
  category?: Category | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
}

export interface NewProduct {
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: number;
  sku: string;
  status: "draft" | "active" | "archived";
  isFeatured: boolean;
  categoryId: number | null;
}
