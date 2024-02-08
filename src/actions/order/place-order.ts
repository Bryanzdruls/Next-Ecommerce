"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  //Verificar usuario
  if (!userId) {
    return {
      ok: false,
      message: "No hay session de usuario",
    };
  }

  //Obtener informacion de los productos
  //Nota: recuerden que podemos llevar 2(+) productos con el mismo id
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  //Calcular los montos //Encabezado
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  //totales de tax, subtotal, total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) {
        throw new Error(`${item.productId} no existe - 500`);
      }

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * Number(process.env.TAX ?? 0.15);
      totals.total += subTotal * 1.15; //Todo obtener de variable de entorno

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  try {
    //crear la transaccion en base de datos
    const prismaTransaction = await prisma.$transaction(async (tx) => {
      //1. Actualizar el store de los productos
      const updatedProductsPromises = products.map(async (product) => {
        //Acumular los valores
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} No tiene cantidad definida`);
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      //Verificar valores negativos en la existencia = no hay stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`);
        }
      });

      //2. Crear la orden - Encabezado -Detalle
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                productId: p.productId,
                quantity: p.quantity,
                size: p.size,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });
      //validar si el price es 0 entonces lanzar error

      //3. Crear la direccion de la orden.
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          orderId: order.id,
          ...restAddress,
          countryId: country,
        },
      });

      return {
        ok: true,
        order,
        orderAddress,
        updatedProducts,
      };
    });


    return {
        ok:true,
        order: prismaTransaction.order,
        prismaTransaction
    }
  } catch (error: any) {
    console.log(error);
    
    return {
      ok: false,
      message: error.message,
    };
  }
};
