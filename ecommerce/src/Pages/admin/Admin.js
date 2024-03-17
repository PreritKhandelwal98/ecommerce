import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../Components/admin/addProduct/AddProduct";
import Home from "../../Components/admin/home/Home";
import Navbar from "../../Components/admin/navbar/Navbar";
import OrderDetails from "../../Components/admin/orderDetails/OrderDetails";
import Orders from "../../Components/admin/orders/Orders";
import ViewProducts from "../../Components/admin/viewProducts/ViewProducts";

import styles from "./Admin.module.scss";

const Admin = () => {
    return (
        <div className={styles.admin}>
            <div className={styles.navbar}>
                <Navbar />
            </div>
            <div className={styles.content}>
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="all-products" element={<ViewProducts />} />
                    <Route path="add-product/:id" element={<AddProduct />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="order-details/:id" element={<OrderDetails />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;