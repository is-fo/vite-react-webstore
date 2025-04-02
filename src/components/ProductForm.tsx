import React, { useState } from "react";
import "../styles/ProductForm.css";
import { Product } from "../types/Product";

interface ProductFormPopup {
  product: Product;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormPopup> = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    product: product,
    price: product.price,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (formData.name.length < 2 || formData.name.length > 50) {
        newErrors.name = "Name must be between 2 and 50 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) || formData.email.length > 50) {
        newErrors.email = "Invalid email format (max 50 chars).";
    }

    if (!/^[0-9\-\(\)\s]+$/.test(formData.phone) || formData.phone.length > 50) {
        newErrors.phone = "Phone number must only contain digits, dashes, or parentheses (max 50 chars).";
    }

    if (formData.address.length < 2 || formData.address.length > 50) {
        newErrors.address = "Address must be between 2 and 50 characters.";
    }

    if (!/^\d{5}$/.test(formData.postalCode)) {
        newErrors.postalCode = "Postal code must be exactly 5 digits.";
    }

    if (formData.city.length < 2 || formData.city.length > 50) {
        newErrors.city = "City must be between 2 and 50 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
 }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
        console.log("Form submitted with data: ", formData);
        alert(`Form submitted for ${formData.product.title}`);
        onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "postalCode" ? value.replace(" ", "") : value,
    }));
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="material-symbols-outlined close-btn" onClick={onClose}>{'\u{e5cd}'}</button>
        <h2>Purchase Form</h2>
        <div className="title-price">
            <p>{product.title}</p>
            <p>${product.price}</p>
        </div>
        <form onSubmit={handleSubmit} className="purchase-form">
          <div>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div>
            <input type="text" name="phone" placeholder="Phonenumber" value={formData.phone} onChange={handleChange} />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          <div>
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>

          <div>
            <input type="text" name="postalCode" placeholder="Postal code" value={formData.postalCode} onChange={handleChange} />
            {errors.postalCode && <p className="error">{errors.postalCode}</p>}
          </div>

          <div>
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
