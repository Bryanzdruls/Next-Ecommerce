import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
export default function () {
  //redirect('/empty');
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Carrito" />
        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">


          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href={"/"} className="underline mb-5">
              Continua comprando
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
                  <p>${producto.price}</p>
                  <QuantitySelector quantity={1} />

                  <button className="underline mt-3">Remover</button>
                </div>
              </div>
            ))}
          </div>


          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
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
                <Link
                  className="flex btn-primary justify-center"
                  href={"/checkout/address"}>
                  Checkout
                </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
