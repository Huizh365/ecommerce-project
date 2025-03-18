import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ICustomer } from "../types/Customer"
import "../styles/admin.css"
import { useCustomers } from "../hooks/useCustomers"

export const UpdateCustomer = () => {
    const [customer, setCustomer] = useState<ICustomer | null>(null)
    const {navigate, params, fetchCustomerByIdHandler, updateCustomerHandler, isLoading, error} = useCustomers()

    useEffect(()=>{
        if(!params.id) return
        fetchCustomerByIdHandler(+params.id).then((data) => setCustomer(data))
    },[])

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setCustomer(customer => {
            if (!customer) return customer
            return {...customer,[e.target.id]: e.target.value};
        });
    }

    const handleUpdateCustomer = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!customer) return
        await updateCustomerHandler(customer.id, customer)
        navigate("/admin/customers")
    }

    return (
        <>
        <h2>Update Customer</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleUpdateCustomer}>
            <label htmlFor="firstname">Firstname
            <input id="firstname" type="text" value={customer?.firstname ?? ""} onChange={handleChange}></input>
            </label>
            
            <label htmlFor="lastname">Lastname
            <input id="lastname" type="text" value={customer?.lastname  ?? ""} onChange={handleChange}></input>
            </label>

            <label htmlFor="email">Email
            <input id="email" type="text" value={customer?.email  ?? ""} onChange={handleChange}></input>
            </label>

            <label htmlFor="password">Password
            <input id="password" type="password" value={customer?.password  ?? ""} onChange={handleChange}></input>
            </label>

            <label htmlFor="phone">Phone
            <input id="phone" type="text" value={customer?.phone  ?? ""} onChange={handleChange}></input>
            </label>

            <label htmlFor="postal_code">Postal-code
            <input id="postal_code" type="text" value={customer?.postal_code  ?? ""} onChange={handleChange}></input>
            </label>

            <label id="address-label" htmlFor="street_address">Address
            <input id="street_address" type="text" value={customer?.street_address  ?? ""} onChange={handleChange}></input>
            </label>

            <label htmlFor="city">City
            <input id="city" type="text" value={customer?.city  ?? ""} onChange={handleChange}></input>
            </label>

            <label htmlFor="country">Country
            <input id="country" type="text" value={customer?.country  ?? ""} onChange={handleChange}></input>
            </label>

            <button className="submit-btn" type="submit">Save</button>
            <button className="cancel-btn" type="button" onClick={()=>navigate("/admin/customers")}>Cancel</button>

        </form>
        </>
    )
}