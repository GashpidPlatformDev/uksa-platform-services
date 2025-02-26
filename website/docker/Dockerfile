# Etapa de compilación
FROM node:18-alpine AS build

WORKDIR /app

# Copiar el código fuente desde el directorio padre (..)
COPY ../ . 

# Copiar el archivo .env.example desde la raíz del proyecto a /app
RUN cp .env.production .env

# Instalar nano para que el usuario pueda editar el archivo .env
RUN apk add --no-cache nano && nano .env

# Instalar dependencias con --legacy-peer-deps para evitar conflictos de versiones
RUN npm install --legacy-peer-deps && npm run build

# Etapa final para servir la app con `serve`
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/build /app/build
RUN npm install -g serve
EXPOSE 80
CMD ["serve", "-s", "/app/build", "-l", "80"]

