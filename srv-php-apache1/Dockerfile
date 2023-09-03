
# Usamos la imagen base de php:apache-bullseye
FROM php:apache-bullseye

# Actualizamos los repositorios y luego instala el paquete necesario
RUN apt-get update
# RUN apt-get install -y libmysqli-dev
RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli

# Establecemos el directorio de trabajo
WORKDIR /var/www/html

# Copiamos el contenido del directorio local a /var/www/html en el contenedor
COPY ./ /var/www/html/

# Exponemos el puerto 80
EXPOSE 80

# Comando para iniciar el servidor Apache cuando se inicie el contenedor
CMD ["apache2-foreground"]

