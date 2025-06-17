import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/Navbar/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetail/ItemDetailContainer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="container-fluid mt-5 pt-4 px-4">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-10">
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="/category/:categoryName" element={<ItemListContainer />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
            </Routes>
          </div>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;