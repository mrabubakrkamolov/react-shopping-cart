function CartSidebar({ cart, totalItems, totalPrice, onChangeQty, onClear }) {
  return (
    <aside className="cart" aria-label="Shopping cart">
      <h2>
        Your Cart <span className="badge">{totalItems}</span>
      </h2>

      {cart.length === 0 ? (
        <p className="empty">Your cart is empty. Add a product to get started.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/112?text=" + encodeURIComponent(item.name);
                  }}
                />
                <div className="info">
                  <strong>{item.name}</strong>
                  <span>${item.price.toFixed(2)} each</span>
                  <div className="qty">
                    <button
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() => onChangeQty(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() => onChangeQty(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <span className="line-total">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="total">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <button className="btn full" onClick={onClear}>
            Clear cart
          </button>
        </>
      )}
    </aside>
  );
}

export default CartSidebar;
