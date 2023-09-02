import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TableProduct from "./components/TableProduct";
import AddUpdateComponent from "./components/AddUpdateComponent";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<TableProduct />} />
          <Route path="/products" element={<TableProduct />} />
          <Route path="/products/:pageNumber" element={<TableProduct/>}/>
          <Route path="/search-product/:searchData" element={<TableProduct/>}/>
          <Route path="/add-product" element={<AddUpdateComponent />} />
          <Route path="/edit-product/:id" element={<AddUpdateComponent />} />
          <Route path="/detail-product/:id" element={<AddUpdateComponent />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
