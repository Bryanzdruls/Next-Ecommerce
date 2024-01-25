'use server'
import bcryptjs from 'bcryptjs';
export const registerUser = async(name:string, email:string, password:string ) =>{

    try {
        const userDb = await prisma?.user.findFirst({where:{email}})
        if (userDb) {
            return {
                ok: false,
                message: 'Ya existe un correo asociado a ese usuario'
            }
        }
        const user = await prisma?.user.create({
            data:{
                name: name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password),
            },
            select:{
                id:true,
                name:true,
                email:true,

            }
        })
        
        return {
            ok: true,
            user,
            message: 'Usuario Creado'
        }
    } catch (error) {
        console.log(error);        
        return {
            ok: false,
            message: 'No se pudo crear el usuario'
        }
    }
}