'use client';
import Image from "next/image"
import { useCartStore } from '@/store';
import { QuantitySelector } from "@/components";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { CartProduct} from "@/interfaces";



export const ProductsInCart = () => {
  const productsInCart = useCartStore(state => state.cart);
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);
    const [loaded, setLoaded] = useState(false)

    const removerProductoHandler = (producto:CartProduct)=>{
      removeProduct(producto);
    }

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) {
        return <p>Loading...</p>
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
                  <Link
                  className="hover:underline cursor-pointer"
                    href={`/product/${producto.slug}`}
                  >
                  {producto.size}-{producto.title}
                  
                  </Link>
                  <p>${producto.price.toFixed(2)}</p>
                  <QuantitySelector
                    quantity={producto.quantity} 
                    onQuantityChanged={quantity => updateProductQuantity(producto,quantity)}
                    />

                  <button 
                    onClick={()=>removerProductoHandler(producto)}
                    className="underline mt-3">Remover</button>
                </div>
              </div>
            ))}
    </>
  )
}
