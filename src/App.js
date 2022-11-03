import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

import CartHeader from "./components/Layout/Header";
import Shirts from "./components/Shirts/Shirts";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Welcome from "./Pages/Welcome";
import AuthPage from "./Pages/AuthPage";
import UserProfile from "./components/Profile/UserProfile";
import CheckoutPage from "./Pages/CheckoutPage";
import Books from "./components/Books/Books";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const authCtx = useContext(AuthContext);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Welcome" />} />
        <Route
          path="/Welcome"
          element={
            <CartProvider>
              {cartIsShown && <Cart onClose={hideCartHandler} />}
              <CartHeader onShowCart={showCartHandler} />
              <main>
                <Welcome />
              </main>
            </CartProvider>
          }
        />
        <Route
          path="/Shirts"
          element={
            <CartProvider>
              {cartIsShown && <Cart onClose={hideCartHandler} />}
              <CartHeader onShowCart={showCartHandler} />
              <main>
                <Shirts />
              </main>
            </CartProvider>
          }
        />
        <Route
          path="/Books"
          element={
            <CartProvider>
              {cartIsShown && <Cart onClose={hideCartHandler} />}
              <CartHeader onShowCart={showCartHandler} />
              <main>
                <Books />
              </main>
            </CartProvider>
          }
        />
        {!authCtx.isLoggedIn && (
          <Route
            path="/auth"
            element={
              <CartProvider>
                {cartIsShown && <Cart onClose={hideCartHandler} />}
                <CartHeader onShowCart={showCartHandler} />
                <main>
                  <AuthPage />
                </main>
              </CartProvider>
            }
          />
        )}
        {authCtx.isLoggedIn && (
          <Route
            path="/profile"
            element={
              <CartProvider>
                {cartIsShown && <Cart onClose={hideCartHandler} />}
                <CartHeader onShowCart={showCartHandler} />
                <main>
                  <UserProfile />
                </main>
              </CartProvider>
            }
          />
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/profile" element={<Navigate replace to="/auth" />} />
        )}

        <Route
          path="/checkout"
          element={
            <CartProvider>
              {cartIsShown && <Cart onClose={hideCartHandler} />}
              <CartHeader onShowCart={showCartHandler} />
              <main>
                <CheckoutPage />
              </main>
            </CartProvider>
          }
        />

        <Route path="*" element={<Navigate replace to="/Welcome" />} />
      </Routes>
    </div>
  );
}

export default App;
