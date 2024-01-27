# Descripcion

## Correr en desarrollo

1. Clonar el repositorio.
2. Crear una copia del archivo ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar las dependencias ```npm install```
4. Levantar la base de datos ```docker compose up -d```
5. Correr las migraciones de prisma ```npx prisma migrate dev```
6. Ejecutar Seed ```npm run seed```
7. Limpiar el local storage del navegador.
8. Correr el proyecto  ```npm run dev```


## Correr en produccion

