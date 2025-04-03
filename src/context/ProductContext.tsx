import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../types/Product";

interface ProductState {
    products: Product[];
}

const ProductContext = createContext<ProductState>( {products: [] });

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("fake-store-api-production-26f6.up.railway.app")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch(console.error);
    }, []);

    return(
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}