import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import ProductForm from "./ProductForm";
import "./Categories.css";

export interface Product {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
}

interface Category {
    id: number;
    name: string;
    image: string;
    slug: string;
}

function Categories() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
        .catch(console.error);
    }, []);

    const groupedProducts = products.reduce((acc, product) => {
        const categoryName = product.category.name;
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(product);
        return acc;
    }, {} as Record<string, Product[]>);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
    }

    const closePopUp = () => {
        setSelectedProduct(null);
    }

    return (
        <div>
            {Object.entries(groupedProducts).map(([categoryName, products]) => (
                <div key={categoryName} className="category-container">
                    <h2 className="category-header">{categoryName}</h2>
                    <div className="product-list">
                        {products.map((p) => (
                            <ProductItem key={p.id} product={p} onClick={() => handleProductClick(p)}/>
                        ))}
                    </div>
                </div>
            ))}
            {selectedProduct && (
                <ProductForm product={selectedProduct} onClose={closePopUp} />
            )}
        </div>
    );
}

export default Categories;