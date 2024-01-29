//address
export * from './address/set-user-address'
export * from './address/delete-user-address'
export * from './address/get-user-address'

//auth
export * from './auth/login'
export * from './auth/logout'

export * from './auth/register'
//Category
export * from './category/get-categories'


//Country
export * from './country/get-countries'

//Order
export * from './order/place-order'
export * from './order/get-order-by-id'
export * from './order/get-order-by-user'
export * from './order/get-paginated-orders'

//paypal
export * from './payments/set-transaction-id'
export * from './payments/paypal-payment'


//product
export * from './product/product-pagination'
export * from './product/get-product-by-slug'
export * from './product/get-stock-by-slug'
export * from './product/create-update-product'
export * from './product/delete-product-image'

//users
export * from './users/get-paginated-users'
export * from './users/change-user-role'

