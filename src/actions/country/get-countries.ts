'use server'

import { Country } from "@/interfaces";

export const getCountries = async():Promise<Country[] | []>=>{
    try {
        const countries = await prisma?.country.findMany({
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