import { useEffect } from "react"
import { Link } from "react-router"
import "../styles/admin.css"
import { useCustomers } from "../hooks/useCustomers"

export const ManageCustomers = () => {
    const {customers, error, isLoading, fetchCustomersHandler, deleteCustomerHandler} = useCustomers()
    
    useEffect(()=> {
        fetchCustomersHandler()
    },[])

    return (
        <>
        <h2>Manage Customers</h2>
        <Link to="/admin/create-customer">
            <button className="create-btn">Create Customer</button>
        </Link>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <table id="customer-list">
            <thead>
            <tr>
                <th>ID</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Street</th>
                <th>City</th>
                <th>Country</th>
                <th>Postal Code</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {
                customers.map((c) =>(
                    <tr className="customer-item" key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.firstname}</td>
                        <td>{c.lastname}</td>
                        <td>{c.email}</td>
                        <td>{c.phone}</td>
                        <td>{c.street_address}</td>
                        <td>{c.city}</td>
                        <td>{c.country}</td>
                        <td>{c.postal_code}</td>
                        <td><Link to={`${c.id}`}>UPDATE </Link> <a href="#" className="delete-link" onClick={()=>deleteCustomerHandler(c.id)}> DELETE</a></td>
                    </tr>
                ))
            }
            </tbody>
        </table>

        </>

        
    )
}