const { useState } = React;

function TShirtCard({ shirt, index, onBuy, onQuantityChange }) {
  const handleBuy = () => {
    onBuy(index);
  };

  const handleQuantityChange = (e) => {
    onQuantityChange(index, parseInt(e.target.value));
  };

  return (
    <div style={{ border: "1px solid #ccc", margin: 10, padding: 10, width: 200 }}>
      <h3>{shirt.title}</h3>
      <img src={`images/${shirt.image}`} alt={shirt.title} style={{ width: "100%" }} />
      <p>Price: ${shirt.price.toFixed(2)}</p>
      {shirt.stock > 0 ? (
        <>
          <p>Stock: {shirt.stock}</p>
          <label>Qty: </label>
          <select value={shirt.quantity} onChange={handleQuantityChange}>
            {Array.from({ length: shirt.stock }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button onClick={handleBuy}>Buy</button>
        </>
      ) : (
        <p style={{ color: "red", fontWeight: "bold" }}>Out of Stock</p>
      )}
    </div>
  );
}

function App() {
  const [shirts, setShirts] = useState(tshirts);

  const handleBuy = (index) => {
    setShirts(prev =>
      prev.map((item, i) =>
        i === index
          ? { ...item, stock: item.stock - item.quantity, quantity: 1 }
          : item
      )
    );
  };

  const handleQuantityChange = (index, quantity) => {
    setShirts(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity } : item
      )
    );
  };

  return (
    <div>
      <h1>T-Shirts Store</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {shirts.map((shirt, index) => (
          <TShirtCard
            key={index}
            shirt={shirt}
            index={index}
            onBuy={handleBuy}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
