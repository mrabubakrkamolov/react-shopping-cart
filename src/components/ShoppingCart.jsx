import { useState } from "react";
import ProductList from "./ProductList.jsx";
import CartSidebar from "./CartSidebar.jsx";

const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 59.99, image: "https://i.pinimg.com/736x/13/fa/01/13fa01d2ad8c5ee07d4af17f41e90541.jpg" },
  { id: 2, name: "Smart Watch", price: 129.0, image: "https://i.pinimg.com/736x/7a/7e/34/7a7e347d293fe5e371cb8948e55666ae.jpg" },
  { id: 3, name: "Running Sneakers", price: 79.9, image: "https://i.pinimg.com/736x/00/a1/19/00a1193221dc58f15e6dcdbb5fa76e72.jpg" },
  { id: 4, name: "Hoodie", price: 44.5, image: "https://i.pinimg.com/736x/59/52/57/5952579aeed3f838e32323fbc9fec1a2.jpg" },
  { id: 5, name: "Backpack", price: 54.0, image: "https://i.pinimg.com/1200x/24/f2/52/24f252567b3a2bb0d9d96d75405498c4.jpg" },
  { id: 6, name: "Sunglasses", price: 24.99, image: "https://i.pinimg.com/1200x/31/a1/1e/31a11eb98590ff7fb3d1a454caf9d6e8.jpg" },
];

function ShoppingCart() {
  // State is lifted here: both ProductList and CartSidebar need the cart.
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      return exists
        ? prev.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          )
        : [...prev, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // Derived values: computed from state, not stored in state.
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="shop">
      <ProductList
        products={PRODUCTS}
        cart={cart}
        onAdd={addToCart}
        onRemove={removeFromCart}
      />
      <CartSidebar
        cart={cart}
        totalItems={totalItems}
        totalPrice={totalPrice}
        geQty={changeQty}
        onChangeQty={changeQty}
        onClear={clearCart}
      />
    </div>
  );
}

export default ShoppingCart;
