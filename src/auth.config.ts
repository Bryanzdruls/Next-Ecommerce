import  NextAuth, {type NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
 
export const authConfig: NextAuthConfig = {
    trustHost: true,
    //trustHostedDomain: true,
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    callbacks:{
        jwt({token,user}){
            if (user) {
                token.data = user;
            }

            return token;
        },    
        session(params) {
            const {session, user, token} = params as any //Si existen
            session.user =token.data as any;
            return params.session;
        },
    },
    providers: [

        credentials({
            async authorize(credentials) {
              const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

                if(!parsedCredentials.success) return null;

                const {email, password} = parsedCredentials.data;
                
                // Buscar el Correo
                const user = await prisma.user.findUnique({where: {email: email.toLowerCase()}});

                if(!user) return null;
                                
                // Comparar las contraseñas
                if (!bcryptjs.compareSync(password, user.password)) return null

                // Regresar el usuario
                const {password: _ , ...rest} = user;
            
                
                return rest;
            },
          }),
    ]
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);