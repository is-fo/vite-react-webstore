import React, { useState } from "react";
import { Product } from "./Categories";
import "../components/ProductItem.css"



interface ProductItemProps {
  product: Product;
  onClick: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onClick }) => {
    const [showDescription, setShowDescription] = useState(false);

    const handleFlip = () => {
        setShowDescription(!showDescription);
    }

    return (

    <div className="product-item">
        <div className="image-container">
            <img src={product.images[0]} alt={product.title}
            className={`product-image ${showDescription ? 'hidden' : ''}`}
             />
             {showDescription && <p className="product-description">{product.description}</p>}

             <button className="flip-button" onClick={handleFlip}>
             <span className="material-symbols-outlined">
                {showDescription ? '\u{e3f4}' : '\u{e873}'} {}
              </span>
             </button>
        </div>
        <div className="title-card" >
            <h2>{product.title}</h2>
            <p>${product.price}</p>
            <div>
                <button className="purchase-btn" onClick={onClick}>Purchase now</button>
                <button className="addtocart-btn" >Add to cart</button>
            </div>
        </div>
    </div>
    );
};

export default ProductItem;