'use server'

import { Country } from "@/interfaces";
import prisma from '@/lib/prisma';

export const getCountries = async():Promise<Country[] | []>=>{
    try {
        const countries = await prisma.country.findMany({
            orderBy:{
                name: 'asc'
            }
        }) as Country[]
        return countries;
    } catch (error) {
        console.log(error);
        
        return [];
    }
}