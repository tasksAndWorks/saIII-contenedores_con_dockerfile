
# Utilizamos la imagen base de php:apache-bullseye
FROM php:apache-bullseye

# Establecemos el directorio de trabajo
WORKDIR /var/www/html

# Copiamos el contenido del directorio local a /var/www/html en el contenedor
COPY ./ /var/www/html/

# Exponemos el puerto 81. Este puerto debe ser el mismo que se utiliza para crear el servidor y, al crear el contenedor, cuando hacemos el mapeo de puertos, el puerto del contenedor debe ser igual al puerto expuesto aquí.
EXPOSE 81

# Instalamos NodeJS (ver pasos en: https://github.com/nodesource/distributions/blob/master/README.md#debian-versions)
RUN apt-get update
RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
# Elgimos la versión 16
RUN NODE_MAJOR=16 && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

RUN apt-get update && \
    apt-get install nodejs -y

# Una vez instalado node, ya podemos hacer la instalación de dependencias para ejecutar nuestro servidor.
RUN npm install

CMD ["apache2-foreground"]

