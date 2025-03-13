import { useEffect, useState } from "react"
import { ICustomer } from "../types/Customer"
import { getCustomers } from "../services/customerService"

export const ManageCustomers = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([])
    
    useEffect(()=> {
        getCustomers().then((data)=>setCustomers(data))
    },[])

    return (
        <>
        <h3>Manage customers</h3>
        <div id="customer-list">
            {
                customers.map((c) => (
                    <section className="customer-item" key={c.id}>
                        <p>{c.firstname} {c.lastname}</p>
                        <p>{c.email}</p>
                        <p>{c.password}</p>
                    </section>
                ))
            }
        </div>

        </>

        
    )
}