import { BrowserRouter, Routes, Route } from "react-router";
import { CartProvider } from "./context/CartProvider";
import NavBar from "./components/Navbar/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetail/ItemDetailContainer";
import CartContainer from "./components/CartContainer";
import Checkout from "./components/Checkout";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <main className="container-fluid mt-5 pt-4 px-4">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-10">
              <Routes>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/category/:categoryName" element={<ItemListContainer />} />
                <Route path="/item/:id" element={<ItemDetailContainer />} />
                <Route path="/cart" element={<CartContainer />} />
                <Route path="/checkout" element={<Checkout />} /> {/* Nueva ruta */}
              </Routes>
            </div>
          </div>
        </main>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;