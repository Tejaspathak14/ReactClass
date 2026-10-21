import { useEffect, useMemo, useState } from "react";

const API_URL = "https://makeup-api.herokuapp.com/api/v1/products.json";
const API_TYPES = ["foundation", "eyeshadow", "mascara", "lipstick"];
const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const collections = [
  { id: "all", name: "All makeup" },
  { id: "face", name: "Face" },
  { id: "eyes", name: "Eyes" },
  { id: "lips", name: "Lips" },
];

function getCollection(product) {
  if (["eyeshadow", "mascara", "eyeliner", "eyebrow"].includes(product.category)) return "eyes";
  if (["lipstick", "lip_liner"].includes(product.category)) return "lips";
  return "face";
}

function normalizeProduct(product) {
  const price = Number(product.price);
  const currency = product.currency || (product.price_sign === "$" || !product.price_sign ? "USD" : "");
  const image = product.image_link || product.api_featured_image || "";

  if (currency !== "USD" || price <= 0 || !image) return null;

  return {
    id: product.id,
    title: product.name.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim(),
    description: product.description || `${product.brand || "Makeup"} ${product.product_type || "essential"}`,
    price,
    rating: Number(product.rating) || 0,
    category: product.product_type || "face",
    tags: product.tag_list || [],
    brand: product.brand || "Beauty",
    thumbnail: image.replace(/^http:\/\//i, "https://").replace(/^\/\//, "https://"),
    productLink: product.product_link,
  };
}

function Menu() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem("goodglow-cart") || "[]");
    } catch {
      return [];
    }
  });
  const [activePage, setActivePage] = useState("home");
  const [activeCollection, setActiveCollection] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    Promise.all(API_TYPES.map((type) => fetch(
      `${API_URL}?product_type=${type}&price_greater_than=0`,
      { signal: controller.signal },
    ).then((response) => {
      if (!response.ok) throw new Error("The product catalog could not be loaded.");
      return response.json();
    })))
      .then((productLists) => {
        const queues = productLists.map((list) => list.map(normalizeProduct).filter(Boolean));
        const catalog = [];
        let index = 0;

        while (catalog.length < 100 && queues.some((queue) => index < queue.length)) {
          queues.forEach((queue) => {
            if (queue[index] && catalog.length < 100) catalog.push(queue[index]);
          });
          index += 1;
        }

        setProducts(catalog);
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
  window.localStorage.setItem("goodglow-cart", JSON.stringify(cart));
  }, [cart]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const matches = products.filter((product) => {
      const matchesCollection = activeCollection === "all" || getCollection(product) === activeCollection;
      const searchableText = `${product.title} ${product.brand} ${product.description} ${product.tags?.join(" ") || ""}`.toLowerCase();
      return matchesCollection && searchableText.includes(query);
    });

    if (sort === "price-low") return [...matches].sort((first, second) => first.price - second.price);
    if (sort === "price-high") return [...matches].sort((first, second) => second.price - first.price);
    if (sort === "rating") return [...matches].sort((first, second) => second.rating - first.rating);
    return matches;
  }, [activeCollection, products, search, sort]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (product) => {
    setCheckoutComplete(false);
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) => item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item);
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (productId, change) => {
    setCart((currentCart) => currentCart
      .map((item) => item.id === productId ? { ...item, quantity: item.quantity + change } : item)
      .filter((item) => item.quantity > 0));
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const placeOrder = (event) => {
    event.preventDefault();
    setOrderTotal(cartTotal + (cartTotal >= 75 ? 0 : 6));
    setCheckoutComplete(true);
    setCart([]);
  };

  const showPage = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const featuredProduct = products[0];

  return (
    <div className="storefront">
      <div className="store-announcement text-center">
        FREE SHIPPING OVER $50 <span aria-hidden="true">/</span> 30-DAY RETURNS
      </div>
      <header className="store-header">
        <nav className="container store-nav d-flex align-items-center justify-content-between gap-3 py-3" aria-label="Main navigation">
          <button className="store-logo" type="button" onClick={() => showPage("home")}>
            GOOD GLOW<span>.</span>
          </button>
          <div className="store-nav-links d-flex align-items-center gap-2 gap-md-4">
            <button className={`nav-link ${activePage === "home" ? "active" : ""}`} type="button" onClick={() => showPage("home")}>Home</button>
            <button className={`nav-link ${activePage === "about" ? "active" : ""}`} type="button" onClick={() => showPage("about")}>About</button>
          </div>
          <div className="d-flex align-items-center gap-2">
            <a className="store-signin d-none d-sm-inline" href="/?page=login">Sign in</a>
            <button className="btn btn-dark store-cart-button" type="button" onClick={() => showPage("cart")}>
              Cart <span className="badge text-bg-warning ms-1">{cartCount}</span>
            </button>
          </div>
        </nav>
      </header>

      <main>
        {activePage === "home" && (
          <>
            <section className="container store-hero mt-4 mt-lg-5">
              <div className="row align-items-center g-0">
                <div className="col-lg-6 hero-copy">
                  <p className="eyebrow">MAKEUP, MADE FOR YOUR WAY</p>
                  <h1>Color outside<br />the lines.</h1>
                  <p className="hero-description">Find the shades, textures, and everyday essentials that feel like you. Your next favorite is just a little scroll away.</p>
                  <button className="btn btn-dark btn-lg" type="button" onClick={() => document.getElementById("shop-products")?.scrollIntoView({ behavior: "smooth" })}>
                    Shop the collection <span aria-hidden="true">↓</span>
                  </button>
                </div>
                <div className="col-lg-6 hero-visual">
                  {featuredProduct ? (
                    <img src={featuredProduct.thumbnail} alt={featuredProduct.title} />
                  ) : <div className="hero-image-placeholder" />}
                  <div className="hero-note"><span>01 / THE BEAUTY EDIT</span><strong>Make room for your kind of glow.</strong></div>
                </div>
              </div>
            </section>

            <section className="container shop-section" id="shop-products">
              <div className="shop-heading d-flex flex-wrap align-items-end justify-content-between gap-3">
                <div>
                  <p className="eyebrow">THE GOOD GLOW EDIT</p>
                  <h2>Find your finish</h2>
                </div>
                <p className="product-count mb-1">{visibleProducts.length} products</p>
              </div>

              <div className="shop-controls d-flex flex-column flex-lg-row justify-content-between gap-3">
                <div className="collection-tabs d-flex flex-wrap gap-2" aria-label="Product categories">
                  {collections.map((collection) => (
                    <button
                      className={`btn btn-sm ${activeCollection === collection.id ? "btn-dark" : "btn-outline-dark"}`}
                      key={collection.id}
                      type="button"
                      aria-pressed={activeCollection === collection.id}
                      onClick={() => setActiveCollection(collection.id)}
                    >
                      {collection.name}
                    </button>
                  ))}
                </div>
                <div className="d-flex gap-2 shop-search-sort">
                  <label className="visually-hidden" htmlFor="product-search">Search products</label>
                  <input className="form-control" id="product-search" type="search" placeholder="Search makeup" value={search} onChange={(event) => setSearch(event.target.value)} />
                  <label className="visually-hidden" htmlFor="product-sort">Sort products</label>
                  <select className="form-select" id="product-sort" value={sort} onChange={(event) => setSort(event.target.value)}>
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: low to high</option>
                    <option value="price-high">Price: high to low</option>
                    <option value="rating">Top rated</option>
                  </select>
                </div>
              </div>

              {loading && <div className="catalog-state" role="status">Loading the collection…</div>}
              {error && (
                <div className="alert alert-warning" role="alert">
                  {error} <button className="btn btn-sm btn-outline-dark ms-2" type="button" onClick={() => window.location.reload()}>Try again</button>
                </div>
              )}
              {!loading && !error && visibleProducts.length === 0 && <div className="catalog-state">No products found. Try another search or category.</div>}

              {!loading && !error && visibleProducts.length > 0 && (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 product-grid">
                  {visibleProducts.map((product) => (
                    <div className="col" key={product.id}>
                      <article className="card product-card h-100 border-0">
                        <div className="product-image-wrap">
                          <img className="card-img-top product-image" src={product.thumbnail} alt={product.title} loading="lazy" />
                          <span className="product-rating">{product.rating ? `★ ${product.rating.toFixed(1)}` : "Makeup"}</span>
                        </div>
                        <div className="card-body d-flex flex-column px-0 pb-0">
                          <p className="product-category">{collections.find((collection) => collection.id === getCollection(product))?.name}</p>
                          <h3 className="card-title">{product.title}</h3>
                          <p className="product-brand">{product.brand}</p>
                          <p className="product-description">{product.description}</p>
                          <div className="mt-auto d-flex justify-content-between align-items-center gap-2 pt-3">
                            <strong className="product-price">{money.format(product.price)}</strong>
                            <button className="btn btn-outline-dark btn-sm" type="button" onClick={() => addToCart(product)}>
                              Add to cart <span aria-hidden="true">+</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {activePage === "about" && (
          <section className="container info-page">
            <p className="eyebrow">A LITTLE ABOUT US</p>
            <h1>Beauty looks<br />like being yourself.</h1>
            <div className="row g-5 mt-3">
              <div className="col-lg-7">
                <p className="about-lead">We believe makeup should be an invitation, never an instruction. Good Glow brings together playful color and everyday beauty essentials for experimenting, expressing yourself, or keeping it simple.</p>
              </div>
              <div className="col-lg-5 about-details">
                <h2>Your face, your rules</h2>
                <p>Browse a considered collection of eye, lip, nail, and face favorites, compare prices, and build a cart that feels like you.</p>
                <button className="btn btn-dark mt-3" type="button" onClick={() => showPage("home")}>Shop the collection</button>
              </div>
            </div>
          </section>
        )}

        {activePage === "cart" && (
          <section className="container cart-page">
            <p className="eyebrow">YOUR PICKS</p>
            <div className="d-flex flex-wrap align-items-end justify-content-between gap-3 mb-4">
              <h1>Your cart <span className="cart-total-count">({cartCount})</span></h1>
              <button className="btn btn-outline-dark btn-sm" type="button" onClick={() => showPage("home")}>Continue shopping</button>
            </div>

            {checkoutComplete && (
              <div className="alert alert-success" role="status">
                Order received. Your demo total was {money.format(orderTotal)}. No payment was processed.
              </div>
            )}

            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is taking a rest.</p>
                <button className="btn btn-dark" type="button" onClick={() => showPage("home")}>Browse the collection</button>
              </div>
            ) : (
              <div className="row g-5">
                <div className="col-lg-7">
                  {cart.map((item) => (
                    <article className="cart-line d-flex gap-3 gap-md-4" key={item.id}>
                      <img src={item.thumbnail} alt={item.title} />
                      <div className="flex-grow-1">
                        <h2>{item.title}</h2>
                        <p>{money.format(item.price)} each</p>
                        <div className="d-flex align-items-center gap-3 mt-3">
                          <div className="quantity-control" aria-label={`Quantity for ${item.title}`}>
                            <button type="button" aria-label="Decrease quantity" onClick={() => changeQuantity(item.id, -1)}>−</button>
                            <span>{item.quantity}</span>
                            <button type="button" aria-label="Increase quantity" onClick={() => changeQuantity(item.id, 1)}>+</button>
                          </div>
                          <button className="remove-item" type="button" onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                      </div>
                      <strong>{money.format(item.price * item.quantity)}</strong>
                    </article>
                  ))}
                </div>
                <div className="col-lg-5">
                  <form className="checkout-panel" onSubmit={placeOrder}>
                    <h2>Order summary</h2>
                    <div className="d-flex justify-content-between py-3 border-bottom"><span>Subtotal</span><strong>{money.format(cartTotal)}</strong></div>
                    <div className="d-flex justify-content-between py-3 border-bottom"><span>Shipping</span><span>{cartTotal >= 50 ? "Free" : "$6.00"}</span></div>
                    <div className="d-flex justify-content-between py-3 checkout-total"><strong>Total</strong><strong>{money.format(cartTotal + (cartTotal >= 50 ? 0 : 6))}</strong></div>
                    <label className="form-label mt-3" htmlFor="checkout-email">Email</label>
                    <input className="form-control mb-3" id="checkout-email" type="email" placeholder="you@example.com" required />
                    <label className="form-label" htmlFor="checkout-address">Delivery address</label>
                    <input className="form-control mb-3" id="checkout-address" type="text" placeholder="Street address" required />
                    <button className="btn btn-dark w-100" type="submit">Place demo order</button>
                    <p className="checkout-note">Demo checkout only. No payment details are collected.</p>
                  </form>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="store-footer">
        <div className="container d-flex flex-wrap align-items-center justify-content-between gap-3 py-4">
          <span className="footer-brand">GOOD GLOW<span>.</span></span>
          <span>Find your color. Keep your glow.</span>
          <button type="button" onClick={() => showPage("about")}>About Good Glow</button>
        </div>
      </footer>
    </div>
  );
}

export default Menu;