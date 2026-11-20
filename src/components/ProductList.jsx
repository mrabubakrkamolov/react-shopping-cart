function ProductList({ products, cart, onAdd, onRemove }) {
  return (
    <section className="products" aria-label="Products">
      <h2>Products</h2>
      <div className="grid">
        {products.map((product) => {
          const inCart = cart.find((item) => item.id === product.id);
          return (
            <article className="card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/400x260?text=" + encodeURIComponent(product.name);
                }}
              />
              <div className="card-body">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <div className="actions">
                  <button className="btn primary" onClick={() => onAdd(product)}>
                    Add{inCart ? ` (${inCart.qty})` : ""}
                  </button>
                  <button
                    className="btn"
                    onClick={() => onRemove(product.id)}
                    disabled={!inCart}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ProductList;
