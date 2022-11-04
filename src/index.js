//this is where the root is rendered
//app.js is encapsulated inside the browser router (using react-router version 6)
//and also the AuthContextProvider which means anything inside of it can use the authctx
//bootstrap is also imported here

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";

import "./index.css";
//import the bootstrap css styles, the npm install is also needed
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
