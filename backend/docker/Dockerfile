# Usar una imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json antes de instalar dependencias
COPY package*.json ../

# Instalar las dependencias de producción (sin devDependencies)
RUN npm install --omit=dev

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que la API escucha
EXPOSE 2000

# Comando para ejecutar la API en producción
CMD ["node", "src/index.js"]
