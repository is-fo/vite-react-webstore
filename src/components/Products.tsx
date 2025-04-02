import { useState } from "react";
import ProductItem from "./ProductCard";
import ProductForm from "./ProductForm";
import Credits from "./Credits";
import "../styles/Categories.css";
import { Product } from "../types/Product";
import { useProducts } from "../context/ProductContext";


const Categories: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const { products } = useProducts();

    const groupedProducts = products.reduce((acc, product) => {
        const categoryName = product.category.name;
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(product);
        return acc;
    }, {} as Record<string, Product[]>);

    const handlePurchaseNow = (product: Product) => {
        setSelectedProduct(product);
    }

    const closePopUp = () => {
        setSelectedProduct(null);
    }

    return (
        <div>
            {Object.entries(groupedProducts).map(([categoryName, products]) => (
                <div key={categoryName} className="category-container">
                    <h2 className="category-header">
                        <span>{categoryName}</span>
                    </h2>
                    <div className="product-list">
                        {products.map((p) => (
                            <ProductItem key={p.id} product={p} onClick={() => handlePurchaseNow(p)}/>
                        ))}
                    </div>
                </div>
            ))}
            {selectedProduct && (
                <ProductForm product={selectedProduct} onClose={closePopUp} />
            )}
            <footer>
                <Credits />
            </footer>
        </div>
    );
}

export default Categories;