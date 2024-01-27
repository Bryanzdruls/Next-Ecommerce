'use server';
import prisma from "@/lib/prisma";
export const deleteUserAddress = async (userId: string) =>{

    try {

        const addressBorrar = await prisma.userAddress.findUnique({
            where:{userId}
        })
        
        if (!addressBorrar) {
            return {
                ok:true,
                message:'No tenia direccion asociada'
            }
        }
        const deleted = await prisma.userAddress.delete({
            where:{userId:userId}
        })
        return {
            ok:true,
            deleted,
        }
    } catch (error) {
        console.log(error);

        return {
            ok:false,
            message:'Fallo la eliminacion del address'
        }
        
    }
}