
# Usa la imagen base de php:apache-bullseye
FROM php:apache-bullseye

# Actualiza los repositorios y luego instala el paquete necesario
# RUN apt-get update && apt-get install -y \
#     default-mysql-client \
#     && rm -rf /var/lib/apt/lists/*

RUN apt-get update
# RUN apt-get install -y libmysqli-dev
RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli


# Crea un volumen y establece el directorio de trabajo
# VOLUME /var/www/html
WORKDIR /var/www/html

# Copia el contenido del directorio local a /var/www/html en el contenedor
COPY ./ /var/www/html/


# Expone el puerto 80
EXPOSE 80

# Comando para iniciar el servidor Apache cuando se inicie el contenedor
CMD ["apache2-foreground"]

