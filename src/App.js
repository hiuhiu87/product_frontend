import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TableProduct from "./components/TableProduct";
import ModifyComponent from "./components/ModifyComponent";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/product_frontend" element={<TableProduct />} />
          <Route path="/search-product/:searchData" element={<TableProduct/>}/>
          <Route path="/add-product" element={<ModifyComponent />} />
          <Route path="/edit-product/:id" element={<ModifyComponent />} />
          <Route path="/detail-product/:id" element={<ModifyComponent />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
