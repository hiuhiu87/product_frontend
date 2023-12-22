import "./App.css";
import Header from "./components/Header";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import TableProduct from "./components/TableProduct";
import ModifyComponent from "./components/ModifyComponent";
import React from "react";
import LoginPage from "./components/LoginPage";

const App = () => {
    return (
        <div className="container">
            <Router>
                <Header/>
                <Routes>

                    <Route path="/" element={<Navigate to="/product_frontend"/>}/>
                    <Route path="/product_frontend" element={<TableProduct/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route
                        path="/search-product/:searchData"
                        element={<TableProduct/>}
                    />
                    <Route path="/add-product" element={<ModifyComponent/>}/>
                    <Route path="/edit-product/:id" element={<ModifyComponent/>}/>
                    <Route path="/detail-product/:id" element={<ModifyComponent/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
