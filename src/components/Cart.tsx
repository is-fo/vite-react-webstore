import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

const Cart: React.FC = () => {
    const { state, dispatch } = useCart();

    const totalPrice = state.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
    ).toFixed(2);

    const checkout = () => {
        alert(`${state.map(p => p.quantity + "x " + p.product.title + " $" + p.product.price * p.quantity).join('\n')}\nTotal: \$${totalPrice}`)
    }

    return (
    <div className="category-container">
        <h2 className="category-header">
                        <span>Your Cart</span>
                    </h2>
        <div className="cart-container">
            {state.length != 0 ? state.map((item) => (
                <>
                <div className="cart-product-container" key={item.product.id} style={{ marginBottom: "20px" }}>
                    <div className="left-col">
                        <img className="cart-product-image" src={item.product.images[0]} alt={item.product.title} width={100} />
                    </div>
                    <div className="right-col">
                        <div className="cart-product-info-container">
                                <h3>{item.product.title}</h3>
                                <p>Price: ${item.product.price}</p>
                                <p>Total: ${(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>
                        <div className="cart-button-container">
                            <button className="cart-button cart-button-clear" onClick={() => dispatch({ type: "REMOVE_FROM_CART", productId: item.product.id })}>
                                <span className="material-symbols-outlined">delete</span>
                            </button>
                            <button className="cart-button cart-button-delete" onClick={() => dispatch({ type: "DECREASE", productId: item.product.id })}>
                                <span className="material-symbols-outlined">remove</span>
                            </button>
                            <p className="cart-quantity">{item.quantity}</p>
                            <button className="cart-button cart-button-add" onClick={() => dispatch({ type: "ADD_TO_CART", product: item.product })}>
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>
                    </div>
                </div>
            </>
            )) : <h2>Your cart is empty</h2>}
        </div>
        <div className="cart-total-panel">
            <button className="cart-button cart-clear-all" onClick={() => dispatch({ type: "CLEAR_CART", any: [] })}>CLEAR CART</button>
            <p>Total: ${totalPrice}</p>
            <button className="cart-button cart-clear-all" onClick={() => {state.length > 0 ? checkout() : alert("Cart is empty."); dispatch({ type:"CLEAR_CART", any: [] })}}>CHECKOUT</button>
        </div>
    </div>
    );

};

export default Cart;