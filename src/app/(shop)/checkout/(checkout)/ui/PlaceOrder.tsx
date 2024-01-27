'use client'

import { placeOrder } from "@/actions"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const PlaceOrder = () => {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const {itemsInCart,subTotal,tax,total} = useCartStore(state => state.getSummaryInformation()); 
    const address = useAddressStore(state =>state.address  )
    
    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart);

    useEffect(() => {
        setLoaded(true);
    }, [])

    const onplaceOrder = async() => {
        setIsPlacingOrder(true);    
        
        const productsToOrder = cart.map( product =>({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }))
        
        const res  = await placeOrder(productsToOrder,address);

        if (!res.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(res.message);
            return;
        }
        //* todo salio bien!
        clearCart();
        router.replace('/orders/'+res.order!.id);
    }
    if (!loaded) {
        return <p>Cargando...</p>
    }
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
              
              <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
              <div className="mb-10">
                  <p className="text-xl">{address.firstName} {address.lastName}</p>
                  <p>{address.address}</p>
                  <p>{address.address2}</p>
                  <p>{address.postalCode}</p>
                  <p>{address.city} - {address.country}</p>
                  <p>{address.phone}</p>
              </div>

              {/* Divider */}
              <div 
                className="w-full h-0.5 rounded bg-gray-200 mb-10"
                />
              <h2 className="text-2xl mb-2">Resumen de orden</h2>
              
              <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">{itemsInCart === 1 ? '1 articulo': itemsInCart+ ' articulos'}</span>

                <span>Subtotal</span>
                <span className="text-right">{currencyFormat(subTotal)}</span>

                <span>Impuestos (15%)</span>
                <span className="text-right">{currencyFormat(tax)}</span>

                <span className="text-2xl mt-5">Total:</span>
                <span className="text-2xl mt-5 text-right">{currencyFormat(total)}</span>
              </div>

              <div className="mt-5 mb-2 w-full">
                
                <p className="mb-5">
                  {/* Disclaimer */}
                  <span className="text-xs">
                    Al hacer click en &quot;Colocar orden&quot;, aceptas nuestros 
                     <a href="#" className="underline">Terminos y condiciones</a>
                    y <a href="#" className="underline">Política de privacidad</a>
                  </span>
                </p>
                <p className="text-red-500">{errorMessage}</p>
                <button
                  onClick={onplaceOrder}
                  disabled={isPlacingOrder}
                  //href={"/orders/123"}
                  className={
                    clsx({
                        'flex btn-primary justify-center': !isPlacingOrder,
                        'btn-disabled': isPlacingOrder,
                    })
                  }>
                  Colocar Orden
                </button>
              </div>
          </div>
  )
}
