import { createContext, useState, ReactNode, useEffect, useReducer, useContext } from 'react'
import { Product } from '../types/Product';

export interface CartItem {
    product: Product;
    quantity: number;
}

type CartState = CartItem[];

type CartAction = 
| { type: 'ADD_TO_CART'; product: Product }
| { type: 'REMOVE_FROM_CART'; productId: number }
| { type: 'DECREASE'; productId: number }
| { type: 'CLEAR_CART'; any: Object }
;
const CartContext = createContext<
{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    let updatedCart: CartState;
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.find(item => item.product.id == action.product.id);
            if (existingItem) {
                updatedCart = state.map(item => item.product.id == action.product.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            } else {
                updatedCart = [...state, { product: action.product, quantity: 1}];
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        case 'REMOVE_FROM_CART':
            updatedCart = state.filter(item => item.product.id != action.productId);
            return updatedCart;
        case 'DECREASE':
            updatedCart = state.map(item =>
                item.product.id == action.productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ).filter(item => item.quantity > 0);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        case 'CLEAR_CART':
            updatedCart = [];
            localStorage.setItem('cart', JSON.stringify([]));
            return updatedCart;
    }
}

export const CartProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, [], () => {
        const localData = localStorage.getItem('cart');
        return localData ? JSON.parse(localData) : [];
    });
    return <CartContext.Provider value={{ state, dispatch}}>{children}</CartContext.Provider>
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider!');
    }
    return context;
}