import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
export default function () {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Verificar Orden" />
        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">


          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar Orden</span>
            <Link href={"/cart"} className="underline mb-5">
              Editar Carrito
            </Link>

            {/* items */}
            {productsInCart.map((producto) => (
              <div key={producto.slug} className="flex mb-5">
                <Image
                  src={`/products/${producto.images[0]}`}
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
                  <p>{producto.title}</p>
                  <p>${producto.price} x 3</p>
                  <p className="font-bold">Subtotal: ${producto.price * 3}</p>
                
                </div>
              </div>
            ))}
          </div>


          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">
              
              <h2 className="text-2xl font-bold mb-2">Dirección de entrega</h2>
              <div className="mb-10">
                  <p className="text-xl">Brian Torres</p>
                  <p>Calle48c sur #39a 165</p>
                  <p>Envigado</p>
                  <p>Antioquia</p>
                  <p>00000</p>
                  <p>3054576393</p>
              </div>

              {/* Divider */}
              <div 
                className="w-full h-0.5 rounded bg-gray-200 mb-10"
                />
              <h2 className="text-2xl mb-2">Resumen de orden</h2>
              
              <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">3 Articulos</span>

                <span>Subtotal</span>
                <span className="text-right">$ 100</span>
                
                <span>Impuestos (15%)</span>
                <span className="text-right">$ 100</span>
                
                <span className="text-2xl mt-5">Total:</span>
                <span className="text-2xl mt-5 text-right">$ 200</span>
              </div>

              <div className="mt-5 mb-2 w-full">
                
                <p className="mb-5">
                  {/* Disclaimer */}
                  <span className="text-xs">
                    Al hacer click en "Colocar orden", aceptas nuestros 
                    <a href="#" className="underline">Terminos y condiciones</a>
                    y <a href="#" className="underline">Política de privacidad</a>
                  </span>
                </p>
                <Link
                  className="flex btn-primary justify-center"
                  href={"/orders/123"}>
                  Colocar Orden
                </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
