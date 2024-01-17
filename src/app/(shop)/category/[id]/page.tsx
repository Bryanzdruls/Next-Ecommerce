import { Title } from "@/components";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const products = initialData.products;
interface Props {
  params: {
    id: Category;
  }
}
export default function CategoryIdPage({params}:Props) {
  const {id} = params;
  let title = 'Tienda'

  // if(id === 'kids'){
  //   notFound();
  // }
  const productosFiltrados = products.filter((producto) => producto.gender ===id)
  
   const labels: Record<Category,string> = {
     'men': 'Hombres',
     'women': 'Mujeres',
     'kid': 'Niños',
     'unisex': 'unisex',
   }

  // switch (id) {
  //   case 'men':
  //       title = 'Hombres'
  //     break;
  //   case 'women':
  //       title = 'Mujeres'
  //     break;
  //   case 'kid':
  //       title = 'Niños'
  //     break;
  //   case 'unisex':
  //       title = 'Todos'
  //     break;
  //   default:
  //       title = 'Tienda'
  //       notFound();
  //}
  
  return (
    <div>
        <Title title={`Articulos para ${labels[id]}`} subtitle={`Filtrado por categoria: ${labels[id]}`} className="mb-2"/>

        <ProductGrid products={productosFiltrados}/>
    </div>
    
  );
}