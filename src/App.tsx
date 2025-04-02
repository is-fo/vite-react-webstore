import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState } from 'react';
import './App.css'
import Categories from './components/Products';
import Cart from './components/Cart';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

function App() {  

  const [page, setPage] = useState("home");

  const switchPage = (newPage: string) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <ProductProvider>
      <CartProvider>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <header>
          <button
              className={`cart-button cart-button-clear header-button ${page === "home" ? "active" : ""}`}
              onClick={() => switchPage("home")}>
              Home
          </button>
          <button
              className={`cart-button cart-button-add header-button ${page === "cart" ? "active" : ""}`}
              onClick={() => switchPage("cart")}>
              Cart
          </button>
      </header>
        <main>
              {page === "home" && <Categories />}
              {page === "cart" && <Cart />}
        </main>
      </CartProvider>
    </ProductProvider>
  );
}

export default App
