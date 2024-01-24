//[1,2,3,4,...,7]
export const generatePaginationNumbers =(currentPage:number,totalPages:number) =>{
    if (totalPages <=7) {
        return Array.from({length: totalPages}, (_,i) => i+1)//[1,2,3,4,5,6,7]
    }
    //si la pagina actual esta entre las primeras 3 paginas 
    //mostrar las primeras 3, ...  ultimas 2
    if (currentPage <=3) {
        return [1,2,3, '...',totalPages-1,totalPages];
    }
    //si la pagina actual esta entre las ultimas 3 paginas 
    //mostrar las primeras 2, ...  ultimas 3
    if(currentPage >= totalPages-2){
        return [1,2,'...',totalPages-2, totalPages-1, totalPages];        
    }

    //si la pagina actual esta en el medio
    //mostrar las primera pagina, puntos suspensivos la pagina actual y vecinos
    return [
        1,'...', currentPage-1, currentPage+1, '...', totalPages
    ]
}