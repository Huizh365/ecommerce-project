import { useEffect, useState } from "react"
import { Link } from "react-router"
import { ICustomer } from "../types/Customer"
import { deleteCustomer, getCustomers } from "../services/customerService"

export const ManageCustomers = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([])
    
    useEffect(()=> {
        getCustomers().then((data)=>setCustomers(data))
    },[])

    const handleDelete = async (id:number) => {
        await deleteCustomer(id)
        const newCustomers = customers.filter(c => c.id !== id)
        setCustomers(newCustomers)
    }

    return (
        <>
        <h3>Manage customers</h3>
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
                        <td><Link to={`${c.id}`}>UPDATE</Link> <a href="#" onClick={()=>handleDelete(c.id)}>DELETE</a></td>
                    </tr>
                ))
            }
            </tbody>
        </table>

        </>

        
    )
}