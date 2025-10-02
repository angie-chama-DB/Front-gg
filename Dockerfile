# imagen base de Nginx
FROM nginx:stable-alpine

# un HTML de Hola Mundo
RUN echo '<!DOCTYPE html><html><head><title>Frontend</title></head><body><h1>Hola Mundo desde Frontend!</h1></body></html>' > /usr/share/nginx/html/index.html

# nginx pone por defecto en el puerto 80
