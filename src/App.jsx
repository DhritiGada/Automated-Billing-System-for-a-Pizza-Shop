import { useEffect, useMemo, useState } from "react";
import {
  BadgePercent,
  CheckCircle2,
  Clock3,
  CreditCard,
  History,
  Minus,
  Plus,
  ReceiptText,
  Search,
  ShoppingCart,
  Sparkles,
  Trash2,
  WalletCards,
  X,
} from "lucide-react";
import "./styles.css";

const menu = [
  { id: 1, name: "Farmhouse Classic", category: "Pizza", price: 250, emoji: "🍕", tag: "Classic", description: "Bell peppers, onion, tomato, cheese" },
  { id: 2, name: "Truly Italian", category: "Pizza", price: 350, emoji: "🍕", tag: "Popular", description: "Olives, herbs, mozzarella, tomato" },
  { id: 3, name: "Deep Dish Supreme", category: "Pizza", price: 450, emoji: "🍕", tag: "Premium", description: "Loaded deep-dish style pizza" },
  { id: 4, name: "Paneer Tikka Pizza", category: "Pizza", price: 420, emoji: "🍕", tag: "Spicy", description: "Paneer, onion, capsicum, tikka sauce" },
  { id: 5, name: "Margherita", category: "Pizza", price: 220, emoji: "🍕", tag: "Value", description: "Tomato, mozzarella, basil" },
  { id: 6, name: "Garlic Bread", category: "Sides", price: 150, emoji: "🥖", tag: "Side", description: "Toasted garlic bread with herbs" },
  { id: 7, name: "White Sauce Pasta", category: "Sides", price: 250, emoji: "🍝", tag: "Side", description: "Creamy white sauce pasta" },
  { id: 8, name: "Cheese Dip", category: "Sides", price: 90, emoji: "🧀", tag: "Add-on", description: "Warm cheese dip" },
  { id: 9, name: "Apna Cola", category: "Beverages", price: 90, emoji: "🥤", tag: "Drink", description: "Chilled cola" },
  { id: 10, name: "Lemon Fizz", category: "Beverages", price: 110, emoji: "🍋", tag: "Drink", description: "Sparkling lemon cooler" },
  { id: 11, name: "Chocolate Brownie", category: "Desserts", price: 140, emoji: "🍫", tag: "Dessert", description: "Warm chocolate brownie" },
  { id: 12, name: "Tiramisu Cup", category: "Desserts", price: 180, emoji: "🍰", tag: "Dessert", description: "Coffee-flavored dessert cup" },
];

const toppings = [
  { id: "paneer", name: "Paneer", price: 60 },
  { id: "olives", name: "Olives", price: 60 },
  { id: "mushroom", name: "Mushroom", price: 60 },
  { id: "jalapeno", name: "Jalapeño", price: 60 },
];

const KEYS = {
  cart: "pizzeria-pos.cart",
  orders: "pizzeria-pos.orders",
};

const readStorage = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState(() => readStorage(KEYS.cart, []));
  const [orders, setOrders] = useState(() => readStorage(KEYS.orders, []));
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [payment, setPayment] = useState("Card");
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => localStorage.setItem(KEYS.cart, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem(KEYS.orders, JSON.stringify(orders)), [orders]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const categories = ["All", ...new Set(menu.map((item) => item.category))];

  const filteredMenu = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        !q ||
        [item.name, item.category, item.tag, item.description]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const addSimpleItem = (item) => {
    setCart((current) => {
      const existing = current.find((entry) => entry.key === String(item.id));
      if (existing) {
        return current.map((entry) =>
          entry.key === String(item.id)
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }
      return [
        ...current,
        {
          key: String(item.id),
          id: item.id,
          name: item.name,
          category: item.category,
          unitPrice: item.price,
          quantity: 1,
          toppings: [],
        },
      ];
    });
    setToast("Added " + item.name);
  };

  const addPizzaWithToppings = () => {
    if (!selectedPizza) return;
    const extras = toppings.filter((item) => selectedToppings.includes(item.id));
    const unitPrice =
      selectedPizza.price + extras.reduce((sum, item) => sum + item.price, 0);
    const key = selectedPizza.id + ":" + selectedToppings.slice().sort().join(",");

    setCart((current) => {
      const existing = current.find((entry) => entry.key === key);
      if (existing) {
        return current.map((entry) =>
          entry.key === key ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }

      return [
        ...current,
        {
          key,
          id: selectedPizza.id,
          name: selectedPizza.name,
          category: "Pizza",
          unitPrice,
          quantity: 1,
          toppings: extras,
        },
      ];
    });

    setToast("Added customized " + selectedPizza.name);
    setSelectedPizza(null);
    setSelectedToppings([]);
  };

  const updateQuantity = (key, delta) => {
    setCart((current) =>
      current
        .map((item) =>
          item.key === key
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const discount = couponApplied ? subtotal * 0.5 : 0;
  const taxable = subtotal - discount;
  const cgst = taxable * 0.025;
  const sgst = taxable * 0.025;
  const total = taxable + cgst + sgst;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "MU50") {
      setCouponApplied(true);
      setToast("MU50 applied: 50% discount");
    } else {
      setCouponApplied(false);
      setToast("Coupon code is not valid");
    }
  };

  const placeOrder = () => {
    if (!cart.length) return;

    const order = {
      id: "MU-" + String(Date.now()).slice(-6),
      date: new Date().toISOString(),
      items: cart,
      subtotal,
      discount,
      cgst,
      sgst,
      total,
      payment,
    };

    setOrders((current) => [order, ...current]);
    setLastOrder(order);
    setCart([]);
    setCoupon("");
    setCouponApplied(false);
    setToast("Order " + order.id + " completed");
  };

  return (
    <main>
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">MU</div>
          <div>
            <strong>M.U Pizzeria POS</strong>
            <span>Order & billing operations</span>
          </div>
        </div>

        <div className="topbar-actions">
          <button onClick={() => setHistoryOpen(true)}>
            <History size={17} />
            Orders
            {orders.length > 0 && <span>{orders.length}</span>}
          </button>
          <div className="cart-count">
            <ShoppingCart size={18} />
            <span>{itemCount}</span>
          </div>
        </div>
      </header>

      <section className="hero">
        <div>
          <span className="eyebrow"><Sparkles size={14} /> RESTAURANT OPERATIONS</span>
          <h1>Take the order. Calculate the bill. <em>Close faster.</em></h1>
          <p>
            A modern point-of-sale workflow for menu selection, pizza customization,
            discounts, taxes, payment method selection, and completed-order history.
          </p>
        </div>

        <div className="hero-stat">
          <ReceiptText size={22} />
          <div>
            <strong>Automated billing</strong>
            <span>Subtotal → discount → GST → final total</span>
          </div>
        </div>
      </section>

      <section className="workspace">
        <section className="menu-panel">
          <div className="toolbar">
            <div className="search-box">
              <Search size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search menu"
              />
            </div>
            <div className="category-tabs">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="menu-grid">
            {filteredMenu.map((item) => (
              <article className="menu-card" key={item.id}>
                <div className="menu-visual">
                  <span className="menu-tag">{item.tag}</span>
                  <div className="food-emoji">{item.emoji}</div>
                </div>
                <div className="menu-body">
                  <span>{item.category}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="menu-footer">
                    <strong>₹{item.price}</strong>
                    <button
                      onClick={() =>
                        item.category === "Pizza"
                          ? setSelectedPizza(item)
                          : addSimpleItem(item)
                      }
                    >
                      {item.category === "Pizza" ? "Customize" : "Add"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="bill-panel">
          <div className="bill-header">
            <div>
              <span className="section-label">CURRENT ORDER</span>
              <h2>{itemCount} item{itemCount === 1 ? "" : "s"}</h2>
            </div>
            {cart.length > 0 && (
              <button className="clear-button" onClick={() => setCart([])}>
                <Trash2 size={16} />
                Clear
              </button>
            )}
          </div>

          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-state">
                <ShoppingCart size={28} />
                <h3>No items yet</h3>
                <p>Select menu items to begin an order.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div className="cart-row" key={item.key}>
                  <div>
                    <strong>{item.name}</strong>
                    {item.toppings.length > 0 && (
                      <span>
                        + {item.toppings.map((topping) => topping.name).join(", ")}
                      </span>
                    )}
                    <small>₹{item.unitPrice} each</small>
                  </div>
                  <div className="qty-control">
                    <button onClick={() => updateQuantity(item.key, -1)}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.key, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <strong>₹{(item.unitPrice * item.quantity).toFixed(0)}</strong>
                </div>
              ))
            )}
          </div>

          <div className="coupon-box">
            <div className="coupon-title">
              <BadgePercent size={17} />
              <strong>Coupon</strong>
            </div>
            <div className="coupon-input">
              <input
                value={coupon}
                onChange={(event) => {
                  setCoupon(event.target.value);
                  setCouponApplied(false);
                }}
                placeholder="Enter code"
              />
              <button onClick={applyCoupon}>Apply</button>
            </div>
            <small>Try the original project code: MU50</small>
          </div>

          <div className="bill-breakdown">
            <div><span>Subtotal</span><strong>₹{subtotal.toFixed(2)}</strong></div>
            <div><span>Discount</span><strong>-₹{discount.toFixed(2)}</strong></div>
            <div><span>CGST 2.5%</span><strong>₹{cgst.toFixed(2)}</strong></div>
            <div><span>SGST 2.5%</span><strong>₹{sgst.toFixed(2)}</strong></div>
            <div className="grand-total">
              <span>Total</span>
              <strong>₹{total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="payment-section">
            <span className="section-label">PAYMENT METHOD</span>
            <div className="payment-grid">
              {["Card", "PayPal", "Wallet", "Cash"].map((method) => (
                <button
                  key={method}
                  className={payment === method ? "active" : ""}
                  onClick={() => setPayment(method)}
                >
                  {method === "Card" && <CreditCard size={16} />}
                  {method === "Wallet" && <WalletCards size={16} />}
                  {method === "Cash" && <ReceiptText size={16} />}
                  {method === "PayPal" && <Sparkles size={16} />}
                  {method}
                </button>
              ))}
            </div>
          </div>

          <button
            className="checkout-button"
            disabled={!cart.length}
            onClick={placeOrder}
          >
            Complete order · ₹{total.toFixed(2)}
          </button>
        </aside>
      </section>

      {selectedPizza && (
        <div className="modal-backdrop" onMouseDown={() => setSelectedPizza(null)}>
          <div className="modal" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="section-label">CUSTOMIZE PIZZA</span>
                <h2>{selectedPizza.name}</h2>
              </div>
              <button onClick={() => setSelectedPizza(null)}><X size={20} /></button>
            </div>

            <p className="modal-copy">
              Base price ₹{selectedPizza.price}. Each extra topping adds ₹60.
            </p>

            <div className="topping-grid">
              {toppings.map((topping) => {
                const selected = selectedToppings.includes(topping.id);
                return (
                  <button
                    key={topping.id}
                    className={selected ? "active" : ""}
                    onClick={() =>
                      setSelectedToppings((current) =>
                        selected
                          ? current.filter((id) => id !== topping.id)
                          : [...current, topping.id]
                      )
                    }
                  >
                    <span>{topping.name}</span>
                    <strong>+₹{topping.price}</strong>
                  </button>
                );
              })}
            </div>

            <button className="modal-add" onClick={addPizzaWithToppings}>
              Add customized pizza · ₹
              {(
                selectedPizza.price +
                selectedToppings.length * 60
              ).toFixed(0)}
            </button>
          </div>
        </div>
      )}

      {historyOpen && (
        <div className="modal-backdrop" onMouseDown={() => setHistoryOpen(false)}>
          <div className="history-drawer" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="section-label">COMPLETED ORDERS</span>
                <h2>{orders.length} order{orders.length === 1 ? "" : "s"}</h2>
              </div>
              <button onClick={() => setHistoryOpen(false)}><X size={20} /></button>
            </div>

            <div className="history-list">
              {orders.length === 0 ? (
                <div className="empty-state">
                  <Clock3 size={28} />
                  <h3>No completed orders</h3>
                  <p>Orders will appear here after checkout.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <article className="order-card" key={order.id}>
                    <div className="order-card-header">
                      <div>
                        <strong>{order.id}</strong>
                        <span>{new Date(order.date).toLocaleString()}</span>
                      </div>
                      <strong>₹{order.total.toFixed(2)}</strong>
                    </div>
                    <div className="order-meta">
                      <span>{order.payment}</span>
                      <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {lastOrder && (
        <div className="receipt-toast">
          <CheckCircle2 size={18} />
          <div>
            <strong>{lastOrder.id} completed</strong>
            <span>₹{lastOrder.total.toFixed(2)} · {lastOrder.payment}</span>
          </div>
          <button onClick={() => setLastOrder(null)}><X size={16} /></button>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}

export default App;
