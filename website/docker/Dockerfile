# Usar una imagen base ligera de Alpine
FROM alpine:latest

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos estáticos de React ya generados en ../build
COPY ../build /app/build

# Instalar Node.js y el servidor estático `serve`
RUN apk add --no-cache nodejs npm && npm install -g serve

# Exponer el puerto 80
EXPOSE 80

# Comando para servir los archivos
CMD ["serve", "-s", "/app/build", "-l", "80"]
