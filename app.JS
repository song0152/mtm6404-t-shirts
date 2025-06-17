const { useReducer } = React;

const initialState = tshirts;

function reducer(state, action) {
  switch (action.type) {
    case "BUY":
      return state.map((item, index) => {
        if (index === action.index) {
          const newStock = item.stock - item.quantity;
          return { ...item, stock: newStock, quantity: 1 };
        }
        return item;
      });
    case "CHANGE_QUANTITY":
      return state.map((item, index) => {
        if (index === action.index) {
          return { ...item, quantity: parseInt(action.quantity) };
        }
        return item;
      });
    default:
      return state;
  }
}

function TShirtCard({ shirt, index, dispatch }) {
  const handleBuy = () => {
    dispatch({ type: "BUY", index });
  };

  const handleQuantityChange = (e) => {
    dispatch({ type: "CHANGE_QUANTITY", index, quantity: e.target.value });
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
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>T-Shirts Store</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {state.map((shirt, index) => (
          <TShirtCard
            key={index}
            shirt={shirt}
            index={index}
            dispatch={dispatch}
          />
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
