export const revalidate = 60;//60 segs
import { Pagination, Title } from "@/components";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import { getPaginatedProductsWithImages } from '../../../../actions/product/product-pagination';
import { redirect } from "next/navigation";
import { Gender } from "@prisma/client";


//const products = initialData.products;
interface Props {
  params: {
    gender: string;
  },
  searchParams:{
    page?: string
  };
}
export default async function CategoryIdPage({params,searchParams}:Props) {

  const {gender} = params;
  const page = searchParams.page ? parseInt(searchParams.page): 1;
  
  const {products, currentPage, totalPages} = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });
  if(products.length ===0){
    redirect(`/gender/${gender}`)
  }

  
  // if(id === 'kids'){
  //   notFound();
  // }
  const productosFiltrados = products.filter((producto) => producto.gender ===gender)
  
   const labels: Record<string,string> = {
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
        <Title 
          title={`Articulos para ${labels[gender]}`} 
          subtitle={`Filtrado por categoria: ${labels[gender]}`} 
          className="mb-2"/>

        <ProductGrid products={productosFiltrados}/>
        <Pagination totalPages={totalPages}/>
    </div>
    
  );
}