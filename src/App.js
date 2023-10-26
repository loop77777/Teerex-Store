import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import store from "./store";
import Cart from "./pages/Cart";

export const API_URL =
  "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route exact path="/" Component={Products} />
          <Route exact path="/cart" Component={Cart} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
