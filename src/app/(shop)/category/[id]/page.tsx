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
export default function({params}:Props) {
  const {id} = params;
  let title = 'Tienda'

  // if(id === 'kids'){
  //   notFound();
  // }
  const productosFiltrados = products.filter((producto) => producto.gender ===id)
  
  //Otra forma
  // const labels: Record<Category,string> = {
  //   'men': 'Hombres',
  //   'women': 'Mujeres',
  //   'kid': 'Niños',
  //   'unisex': 'unisex',
  // }

  switch (id) {
    case 'men':
        title = 'Hombres'
      break;
    case 'women':
        title = 'Mujeres'
      break;
    case 'kid':
        title = 'Niños'
      break;
    case 'unisex':
        title = 'Todos'
      break;
    default:
        title = 'Tienda'
        notFound();
  }
  
  return (
    <div>
        <Title title={`Articulos para ${title}`} subtitle={`Filtrado por categoria: ${title}`} className="mb-2"/>

        <ProductGrid products={productosFiltrados}/>
    </div>
    
  );
}