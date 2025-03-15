export interface ICustomer {
    id: number
    firstname: string
    lastname: string
    email: string
    password: string
    phone: string
    street_address: string
    postal_code: string
    city: string
    country: string
}

export type CustomerCreate = Pick<ICustomer, "firstname"|"lastname"|"email"|"password"|"phone"|"street_address"|"city"|"postal_code"|"country">
// export type CustomerCreate = Omit<ICustomer, "id">