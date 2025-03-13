import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ProductDetails } from "./pages/ProductDetails";
import { Products } from "./pages/Products";
import { ManageOrders } from "./pages/ManageOrders";
import { OrderDetails } from "./pages/OrderDetails";
import { ManageProducts } from "./pages/ManageProducts";
import { CreateProduct } from "./pages/CreateProduct";
import { UpdateProduct } from "./pages/UpdateProduct";
import { ManageCustomers } from "./pages/ManageCustomers";
import { CreateCustomer } from "./pages/CreateCustomer";
import { UpdateCustomer } from "./pages/UpdateCustomer";
import { Admin } from "./pages/Admin";
import { Layout } from "./pages/Layout";

export const router = createBrowserRouter([
    {
        path:"/",
        element: < Layout />,
        errorElement: < NotFound />,
        children: [
            {
                path:"/",
                element: < Home />
            },
            {
                path:"/products",
                element: < Products />
            },
            {
                path:"/products/:id",
                element: < ProductDetails />
            },
            {
                path:"/admin",
                element: < Admin />,
                errorElement: < NotFound />,
                children: [
                    {
                        path:"orders",
                        element: < ManageOrders />
                    },
                    {
                        path:"orders/:id",
                        element: < OrderDetails />
                    },
                    {
                        path:"products",
                        element: < ManageProducts />,
                    },
                    {
                        path:"create-product",
                        element: < CreateProduct />
                    },
                    {
                        path:"update-product/:id",
                        element: < UpdateProduct />
                    },

                    {
                        path:"customers",
                        element: < ManageCustomers />,
                    },
                    {
                        path:"create-customer",
                        element: < CreateCustomer />
                    },
                    {
                        path:"customers/:id",
                        element: < UpdateCustomer />
                    }
                    
                ]
            }
            
        ]
    }
])

