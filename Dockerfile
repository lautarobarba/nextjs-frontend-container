ARG NODE_IMAGE=node:22-slim
# ARG NGINX_IMAGE=nginx:stable-alpine

# Development
FROM ${NODE_IMAGE} AS base
WORKDIR /app
RUN apt update -y && apt upgrade -y

# FROM base AS build
# COPY ./frontend/ ./
# RUN npm install
# RUN npm run build

# # Production
# FROM ${NGINX_IMAGE} AS production
# WORKDIR /usr/share/nginx/html

# # Copiar la configuración de Nginx
# COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

# # Copiar los archivos compilados desde la etapa de build
# COPY --from=build /app/build /usr/share/nginx/html

# # Exponer el puerto 80
# EXPOSE 80

# # Iniciar Nginx
# CMD ["nginx", "-g", "daemon off;"]
