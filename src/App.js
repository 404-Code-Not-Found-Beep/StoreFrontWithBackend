//this is the main component
//it contains the routes for the whole application
//the cart provider is encapsulating  each route here to be used anywhere in the application

import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

import CartHeader from "./components/Layout/Header";
import Shirts from "./components/Shirts/Shirts";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Welcome from "./Pages/Welcome";
import LoginPage from "./Pages/LoginPage";
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
            path="/Login"
            element={
              <CartProvider>
                {cartIsShown && <Cart onClose={hideCartHandler} />}
                <CartHeader onShowCart={showCartHandler} />
                <main>
                  <LoginPage />
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
          <Route path="/profile" element={<Navigate replace to="/Login" />} />
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
