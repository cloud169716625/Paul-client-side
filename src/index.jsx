import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App";
import { CookiesProvider } from "react-cookie";

import "./index.scss";
import "./lang/i18n";

ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
