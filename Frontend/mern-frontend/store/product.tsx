import { create } from "zustand";

// Define the type for the product
interface Product {
  name: string;
  price: string;
  image: string;
  _id: string;
}

interface newProduct {
  name: string;
  price: string;
  image: string;
}

// Define the type for the product store
interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  createProduct: (
    newProduct: newProduct
  ) => Promise<{ success: boolean; message: string }>;
  fetchProducts: () => Promise<{ success: boolean; message: string }>;
  deleteProduct: (
    pid: string
  ) => Promise<{ success: boolean; message: string }>;
  updateProduct: (
    pid: string,
    updatedProduct: newProduct
  ) => Promise<{ success: boolean; message: string }>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill out all fields." };
    }
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: "Proxy error or network issue" };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      set({ products: data.data });
      return { success: true, message: "Products fetched successfully" };
    } catch (error) {
      return { success: false, message: "Proxy error or network issue" };
    }
  },
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Proxy error or network issue" };
    }
  },
  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? { ...product, ...data.data } : product
        ),
      }));
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Proxy error or network issue" };
    }
  },
}));
