import { useEffect, useState } from "react"
import { IProduct } from "../types/Product"
import { deleteProduct, getProducts } from "../services/productService"
import { Link } from "react-router"


export const ManageProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect (()=> {
        getProducts().then((data) => setProducts(data))
    },[])

    const handleDelete = async (id:number) => {
        await deleteProduct(id)
        const newProducts = products.filter(p => p.id !== id)
        setProducts(newProducts)
    }
    return (
        <>
<h2>Manage Products</h2>
        <Link to="/admin/create-product">
                <button className="create-btn">Create Product</button>
        </Link>
        <table id="product-list">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Added Date</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
                products.map((p) =>(
                    <tr className="customer-item" key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.price}</td>
                        <td>{p.stock}</td>
                        <td>{p.category}</td>
                        <td>{p.created_at}</td>
                        <td><Link to={`${p.id}`}>UPDATE </Link> <a href="#" className="delete-link" onClick={()=>handleDelete(p.id)}> DELETE</a></td>
                    </tr>
                ))
            }
            </tbody>
        </table>        </>
    )
}