import { useEffect} from "react"
import { Link } from "react-router"
import { useProducts } from "../hooks/useProducts"
import "../styles/admin.css"


export const ManageProducts = () => {
    const { products, isLoading, error, fetchProductsHandler, deleteProductHandler} = useProducts()
    useEffect (()=> {
        fetchProductsHandler()
    },[])

    return (
        <>
        <h2>Manage Products</h2>
        <Link to="/admin/create-product">
                <button className="create-btn">Create Product</button>
        </Link>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
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
                            <td>{p.created_at.slice(0, 10)}</td>
                            <td><Link to={`${p.id}`}>UPDATE </Link> <a href="#" className="delete-link" onClick={()=>deleteProductHandler(p.id)}> DELETE</a></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>            
    </>
    )
}