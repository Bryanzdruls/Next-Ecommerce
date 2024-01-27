'use client';
import Image from "next/image"
import { useCartStore } from '@/store';
import { useEffect, useState } from 'react';
import { currencyFormat } from '../../../../../utils/currencyFormat';



export const ProductsInOrder = () => {
    const productsInCart = useCartStore(state => state.cart);
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) {
        return <p>Cargando...</p>
    }
  return (
    <>
     {productsInCart.map((producto) => (
              <div key={`${producto.slug}-${producto.size}`} className="flex mb-5">
                <Image
                  src={`/products/${producto.image}`}
                  width={100}
                  height={100}
                  style={{
                    height: '100px',
                    width: '100px'
                  }}
                  alt={producto.title}
                  className="mr-5 rounded"
                />
                <div>
                  <span>
                    {producto.size}-{producto.title} ({producto.quantity})             
                  </span>
                  <p className="font-bold">{currencyFormat(producto.price * producto.quantity)}</p>
                 
                </div>
              </div>
            ))}
    </>
  )
}
