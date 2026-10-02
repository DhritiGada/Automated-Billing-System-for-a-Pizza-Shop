import { useEffect, useMemo, useState } from "react";
import {
  BadgePercent,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  History,
  MapPin,
  Minus,
  Plus,
  ReceiptText,
  Search,
  ShoppingCart,
  Store,
  Trash2,
  Truck,
  UserRound,
  UtensilsCrossed,
  WalletCards,
  X,
} from "lucide-react";
import "./styles.css";

const img = (filename) =>
  "https://commons.wikimedia.org/wiki/Special:FilePath/" +
  encodeURIComponent(filename) +
  "?width=900";

const menu = [
  { id: 1, name: "Farmhouse Classic", category: "Pizza", price: 250, tag: "Classic", description: "Bell peppers, onion, tomato and mozzarella", image: img("MargheritaPizzaUS.jpg") },
  { id: 2, name: "Truly Italian", category: "Pizza", price: 350, tag: "Popular", description: "Olives, herbs, mozzarella and tomato", image: img("PizzaMargherita.jpg") },
  { id: 3, name: "Deep Dish Supreme", category: "Pizza", price: 450, tag: "Premium", description: "Loaded deep-dish pizza with extra cheese", image: img("Deep-Dish Pizza.jpg") },
  { id: 4, name: "Paneer Tikka Pizza", category: "Pizza", price: 420, tag: "Spicy", description: "Paneer, onion, capsicum and tikka sauce", image: img("Paneer Tikka Pizza.jpg") },
  { id: 5, name: "Margherita", category: "Pizza", price: 220, tag: "Value", description: "Tomato, mozzarella and basil", image: img("Margherita pizza.jpg") },
  { id: 6, name: "Garlic Bread", category: "Sides", price: 150, tag: "Side", description: "Toasted garlic bread with herbs", image: img("Garlic bread.jpg") },
  { id: 7, name: "White Sauce Pasta", category: "Sides", price: 250, tag: "Side", description: "Creamy white-sauce pasta", image: img("White sauce pasta.jpg") },
  { id: 8, name: "Cheese Dip", category: "Sides", price: 90, tag: "Add-on", description: "Warm cheese dip", image: "https://upload.wikimedia.org/wikipedia/commons/6/65/Queso.jpg" },
  { id: 9, name: "Apna Cola", category: "Beverages", price: 90, tag: "Drink", description: "Chilled sparkling cola", image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Glass_of_cola.jpg" },
  { id: 10, name: "Lemon Fizz", category: "Beverages", price: 110, tag: "Drink", description: "Sparkling lemon cooler", image: img("Classic Lemonade.jpg") },
  { id: 11, name: "Chocolate Brownie", category: "Desserts", price: 140, tag: "Dessert", description: "Warm chocolate brownie", image: img("Brownie chocolate.jpg") },
  { id: 12, name: "Tiramisu Cup", category: "Desserts", price: 180, tag: "Dessert", description: "Coffee-flavored cream dessert", image: img("Tiramisu dessert.jpg") },
  { id: 13, name: "Veggie Supreme", category: "Pizza", price: 390, tag: "Loaded", description: "Peppers, corn, onion, olives and mozzarella", image: img("Vegetarian pizza.jpg") },
  { id: 14, name: "Four Cheese Pizza", category: "Pizza", price: 460, tag: "Cheesy", description: "Mozzarella, cheddar, parmesan and cream cheese", image: img("Quattro formaggi pizza.jpg") },
  { id: 15, name: "Stuffed Garlic Knots", category: "Sides", price: 170, tag: "New", description: "Soft garlic knots stuffed with cheese", image: img("Garlic knots.jpg") },
  { id: 16, name: "Crispy Potato Wedges", category: "Sides", price: 160, tag: "Crispy", description: "Seasoned potato wedges with herb salt", image: img("Potato wedges.jpg") },
  { id: 17, name: "Cold Coffee", category: "Beverages", price: 140, tag: "Chilled", description: "Creamy cold coffee over ice", image: img("Iced coffee.jpg") },
  { id: 18, name: "Berry Cooler", category: "Beverages", price: 130, tag: "Fresh", description: "Mixed berry sparkling cooler", image: img("Berry drink.jpg") },
  { id: 19, name: "Vanilla Cheesecake", category: "Desserts", price: 190, tag: "Creamy", description: "Classic vanilla cheesecake slice", image: img("Cheesecake with vanilla.jpg") },
  { id: 20, name: "Chocolate Mousse", category: "Desserts", price: 170, tag: "Rich", description: "Silky chocolate mousse cup", image: img("Chocolate mousse.jpg") },
];

const toppings = [
  { id: "paneer", name: "Paneer", price: 60 },
  { id: "olives", name: "Olives", price: 60 },
  { id: "mushroom", name: "Mushroom", price: 60 },
  { id: "jalapeno", name: "Jalapeño", price: 60 },
];

const sizes = [
  { id: "regular", name: "Regular", price: 0 },
  { id: "large", name: "Large", price: 120 },
];

const crusts = [
  { id: "classic", name: "Classic", price: 0 },
  { id: "thin", name: "Thin", price: 0 },
  { id: "cheese", name: "Cheese Burst", price: 80 },
];

const statusFlow = ["New", "Preparing", "Ready", "Completed"];

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
  const [orderType, setOrderType] = useState("Dine-in");
  const [customer, setCustomer] = useState("");
  const [table, setTable] = useState("");
  const [address, setAddress] = useState("");
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [size, setSize] = useState("regular");
  const [crust, setCrust] = useState("classic");
  const [itemNote, setItemNote] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [toast, setToast] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

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
      const matchesQuery = !q || [item.name, item.category, item.tag, item.description].join(" ").toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  useEffect(() => setPage(1), [query, category, pageSize]);

  const pageCount = Math.max(1, Math.ceil(filteredMenu.length / pageSize));
  const visibleMenu = filteredMenu.slice((page - 1) * pageSize, page * pageSize);
  const rangeStart = filteredMenu.length ? (page - 1) * pageSize + 1 : 0;
  const rangeEnd = Math.min(page * pageSize, filteredMenu.length);

  const addSimpleItem = (item) => {
    setCart((current) => {
      const existing = current.find((entry) => entry.key === String(item.id));
      if (existing) {
        return current.map((entry) =>
          entry.key === String(item.id) ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...current, {
        key: String(item.id),
        id: item.id,
        name: item.name,
        category: item.category,
        unitPrice: item.price,
        quantity: 1,
        modifiers: [],
        note: "",
      }];
    });
    setToast("Added " + item.name);
  };

  const openPizza = (item) => {
    setSelectedPizza(item);
    setSelectedToppings([]);
    setSize("regular");
    setCrust("classic");
    setItemNote("");
  };

  const addPizzaWithModifiers = () => {
    if (!selectedPizza) return;
    const toppingItems = toppings.filter((item) => selectedToppings.includes(item.id));
    const sizeItem = sizes.find((item) => item.id === size);
    const crustItem = crusts.find((item) => item.id === crust);
    const unitPrice =
      selectedPizza.price +
      (sizeItem?.price || 0) +
      (crustItem?.price || 0) +
      toppingItems.reduce((sum, item) => sum + item.price, 0);

    const modifierNames = [
      sizeItem?.name,
      crustItem?.name,
      ...toppingItems.map((item) => item.name),
    ].filter(Boolean);

    const key = [
      selectedPizza.id,
      size,
      crust,
      selectedToppings.slice().sort().join(","),
      itemNote.trim().toLowerCase(),
    ].join(":");

    setCart((current) => {
      const existing = current.find((entry) => entry.key === key);
      if (existing) {
        return current.map((entry) =>
          entry.key === key ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }

      return [...current, {
        key,
        id: selectedPizza.id,
        name: selectedPizza.name,
        category: "Pizza",
        unitPrice,
        quantity: 1,
        modifiers: modifierNames,
        note: itemNote.trim(),
      }];
    });

    setToast("Added customized " + selectedPizza.name);
    setSelectedPizza(null);
  };

  const updateQuantity = (key, delta) => {
    setCart((current) =>
      current
        .map((item) =>
          item.key === key ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discount = couponApplied ? subtotal * 0.5 : 0;
  const taxable = subtotal - discount;
  const deliveryFee = orderType === "Delivery" && cart.length ? 60 : 0;
  const cgst = taxable * 0.025;
  const sgst = taxable * 0.025;
  const total = taxable + cgst + sgst + deliveryFee;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const todayRevenue = orders.reduce((sum, order) => {
    const isToday = new Date(order.date).toDateString() === new Date().toDateString();
    return sum + (isToday ? order.total : 0);
  }, 0);

  const openOrders = orders.filter((order) => order.status !== "Completed").length;

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
    if (orderType === "Dine-in" && !table.trim()) {
      setToast("Add a table number for dine-in");
      return;
    }
    if (orderType === "Delivery" && !address.trim()) {
      setToast("Add a delivery address");
      return;
    }

    const order = {
      id: "POS-" + String(Date.now()).slice(-6),
      date: new Date().toISOString(),
      items: cart,
      subtotal,
      discount,
      cgst,
      sgst,
      deliveryFee,
      total,
      payment,
      orderType,
      customer: customer.trim() || "Guest",
      table: table.trim(),
      address: address.trim(),
      status: "New",
    };

    setOrders((current) => [order, ...current]);
    setLastOrder(order);
    setCart([]);
    setCoupon("");
    setCouponApplied(false);
    setCustomer("");
    setTable("");
    setAddress("");
    setToast("Order " + order.id + " sent to kitchen");
  };

  const advanceStatus = (orderId) => {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== orderId) return order;
        const index = statusFlow.indexOf(order.status);
        return { ...order, status: statusFlow[Math.min(index + 1, statusFlow.length - 1)] };
      })
    );
  };

  return (
    <main>
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">MU</div>
          <div>
            <strong>Pizzeria Operations POS</strong>
            <span>Restaurant order & billing operations</span>
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

      <section className="ops-strip">
        <div>
          <span>Today's orders</span>
          <strong>{orders.filter((order) => new Date(order.date).toDateString() === new Date().toDateString()).length}</strong>
        </div>
        <div>
          <span>Open kitchen orders</span>
          <strong>{openOrders}</strong>
        </div>
        <div>
          <span>Today's revenue</span>
          <strong>₹{todayRevenue.toFixed(0)}</strong>
        </div>
      </section>

      <section className="hero">
        <div>
          <span className="eyebrow"><UtensilsCrossed size={14} /> RESTAURANT OPERATIONS</span>
          <h1>Order entry, kitchen handoff, and billing in <em>one flow.</em></h1>
          <p>
            Build dine-in, takeaway, or delivery orders, customize pizzas, apply discounts,
            calculate GST, select payment, and track each order through preparation.
          </p>
        </div>

        <div className="hero-stat">
          <ReceiptText size={23} />
          <div>
            <strong>Automated billing</strong>
            <span>Subtotal → discount → GST → fees → final total</span>
          </div>
        </div>
      </section>

      <section className="order-context">
        <div className="type-selector">
          {[
            ["Dine-in", Store],
            ["Takeaway", ShoppingCart],
            ["Delivery", Truck],
          ].map(([type, Icon]) => (
            <button
              key={type}
              className={orderType === type ? "active" : ""}
              onClick={() => setOrderType(type)}
            >
              <Icon size={17} />
              {type}
            </button>
          ))}
        </div>

        <label>
          <UserRound size={16} />
          <input value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Customer name (optional)" />
        </label>

        {orderType === "Dine-in" && (
          <label>
            <Store size={16} />
            <input value={table} onChange={(e) => setTable(e.target.value)} placeholder="Table number" />
          </label>
        )}

        {orderType === "Delivery" && (
          <label className="address-field">
            <MapPin size={16} />
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery address" />
          </label>
        )}
      </section>

      <section className="workspace">
        <section className="menu-panel">
          <div className="toolbar">
            <div className="search-box">
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search menu" />
            </div>
            <div className="category-tabs">
              {categories.map((item) => (
                <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="menu-grid">
            {visibleMenu.map((item) => (
              <article className="menu-card" key={item.id}>
                <div className="menu-visual">
                  <div className="image-fallback">
                    <span>{item.category}</span>
                    <strong>{item.name}</strong>
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="menu-tag">{item.tag}</span>
                </div>
                <div className="menu-body">
                  <span>{item.category}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div className="menu-footer">
                    <strong>₹{item.price}</strong>
                    <button onClick={() => item.category === "Pizza" ? openPizza(item) : addSimpleItem(item)}>
                      {item.category === "Pizza" ? "Customize" : "Add"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="catalog-pagination">
            <div className="catalog-summary">
              <span>Showing {rangeStart}-{rangeEnd} of {filteredMenu.length}</span>
              <label>
                Items per page
                <select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))}>
                  {[6, 9, 12].map((sizeOption) => (
                    <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="page-controls">
              <button
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>Page {page} of {pageCount}</span>
              <button
                onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                disabled={page === pageCount}
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <aside className="bill-panel">
          <div className="bill-header">
            <div>
              <span className="section-label">CURRENT {orderType.toUpperCase()} ORDER</span>
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
                <ShoppingCart size={30} />
                <h3>No items yet</h3>
                <p>Select menu items to begin an order.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div className="cart-row" key={item.key}>
                  <div>
                    <strong>{item.name}</strong>
                    {!!item.modifiers?.length && <span>{item.modifiers.join(" · ")}</span>}
                    {!!item.note && <em>Note: {item.note}</em>}
                    <small>₹{item.unitPrice} each</small>
                  </div>
                  <div className="qty-control">
                    <button onClick={() => updateQuantity(item.key, -1)}><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.key, 1)}><Plus size={14} /></button>
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
              <input value={coupon} onChange={(event) => { setCoupon(event.target.value); setCouponApplied(false); }} placeholder="Enter code" />
              <button onClick={applyCoupon}>Apply</button>
            </div>
            <small>Original project code: MU50</small>
          </div>

          <div className="bill-breakdown">
            <div><span>Subtotal</span><strong>₹{subtotal.toFixed(2)}</strong></div>
            <div><span>Discount</span><strong>-₹{discount.toFixed(2)}</strong></div>
            <div><span>CGST 2.5%</span><strong>₹{cgst.toFixed(2)}</strong></div>
            <div><span>SGST 2.5%</span><strong>₹{sgst.toFixed(2)}</strong></div>
            {deliveryFee > 0 && <div><span>Delivery fee</span><strong>₹{deliveryFee.toFixed(2)}</strong></div>}
            <div className="grand-total"><span>Total</span><strong>₹{total.toFixed(2)}</strong></div>
          </div>

          <div className="payment-section">
            <span className="section-label">PAYMENT METHOD</span>
            <div className="payment-grid">
              {["Card", "PayPal", "Wallet", "Cash"].map((method) => (
                <button key={method} className={payment === method ? "active" : ""} onClick={() => setPayment(method)}>
                  {method === "Card" && <CreditCard size={16} />}
                  {method === "Wallet" && <WalletCards size={16} />}
                  {method === "Cash" && <ReceiptText size={16} />}
                  {method === "PayPal" && <BadgePercent size={16} />}
                  {method}
                </button>
              ))}
            </div>
          </div>

          <button className="checkout-button" disabled={!cart.length} onClick={placeOrder}>
            Send to kitchen · ₹{total.toFixed(2)}
          </button>
        </aside>
      </section>

      {selectedPizza && (
        <div className="modal-backdrop" onMouseDown={() => setSelectedPizza(null)}>
          <div className="modal customization-modal" onMouseDown={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="section-label">CUSTOMIZE PIZZA</span>
                <h2>{selectedPizza.name}</h2>
              </div>
              <button onClick={() => setSelectedPizza(null)}><X size={20} /></button>
            </div>

            <div className="customizer-section">
              <span>Size</span>
              <div className="choice-grid">
                {sizes.map((item) => (
                  <button key={item.id} className={size === item.id ? "active" : ""} onClick={() => setSize(item.id)}>
                    <strong>{item.name}</strong>
                    <small>{item.price ? "+₹" + item.price : "Included"}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="customizer-section">
              <span>Crust</span>
              <div className="choice-grid three">
                {crusts.map((item) => (
                  <button key={item.id} className={crust === item.id ? "active" : ""} onClick={() => setCrust(item.id)}>
                    <strong>{item.name}</strong>
                    <small>{item.price ? "+₹" + item.price : "Included"}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="customizer-section">
              <span>Extra toppings</span>
              <div className="topping-grid">
                {toppings.map((topping) => {
                  const selected = selectedToppings.includes(topping.id);
                  return (
                    <button
                      key={topping.id}
                      className={selected ? "active" : ""}
                      onClick={() =>
                        setSelectedToppings((current) =>
                          selected ? current.filter((id) => id !== topping.id) : [...current, topping.id]
                        )
                      }
                    >
                      <span>{topping.name}</span>
                      <strong>+₹{topping.price}</strong>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="item-note">
              Kitchen note
              <textarea value={itemNote} onChange={(e) => setItemNote(e.target.value)} placeholder="e.g. light cheese, no onion" />
            </label>

            <button className="modal-add" onClick={addPizzaWithModifiers}>
              Add customized pizza · ₹
              {(
                selectedPizza.price +
                (sizes.find((item) => item.id === size)?.price || 0) +
                (crusts.find((item) => item.id === crust)?.price || 0) +
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
                <span className="section-label">ORDER OPERATIONS</span>
                <h2>{orders.length} order{orders.length === 1 ? "" : "s"}</h2>
              </div>
              <button onClick={() => setHistoryOpen(false)}><X size={20} /></button>
            </div>

            <div className="history-list">
              {orders.length === 0 ? (
                <div className="empty-state">
                  <Clock3 size={30} />
                  <h3>No orders yet</h3>
                  <p>New orders will appear here after checkout.</p>
                </div>
              ) : (
                orders.map((order) => {
                  const statusIndex = statusFlow.indexOf(order.status || "New");
                  return (
                    <article className="order-card" key={order.id}>
                      <div className="order-card-header">
                        <div>
                          <strong>{order.id}</strong>
                          <span>{new Date(order.date).toLocaleString()}</span>
                        </div>
                        <strong>₹{order.total.toFixed(2)}</strong>
                      </div>

                      <div className="order-customer">
                        <span>{order.customer || "Guest"}</span>
                        <span>
                          {order.orderType}
                          {order.table ? " · Table " + order.table : ""}
                        </span>
                      </div>

                      <div className="status-track">
                        {statusFlow.map((status, index) => (
                          <span key={status} className={index <= statusIndex ? "done" : ""}>{status}</span>
                        ))}
                      </div>

                      <div className="order-meta">
                        <span>{order.payment}</span>
                        <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
                      </div>

                      {order.status !== "Completed" && (
                        <button className="advance-button" onClick={() => advanceStatus(order.id)}>
                          Advance to {statusFlow[Math.min(statusIndex + 1, statusFlow.length - 1)]}
                          <ChevronRight size={15} />
                        </button>
                      )}
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {lastOrder && (
        <div className="receipt-toast">
          <CheckCircle2 size={18} />
          <div>
            <strong>{lastOrder.id} sent to kitchen</strong>
            <span>{lastOrder.orderType} · ₹{lastOrder.total.toFixed(2)} · {lastOrder.payment}</span>
          </div>
          <button onClick={() => setLastOrder(null)}><X size={16} /></button>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}

export default App;
