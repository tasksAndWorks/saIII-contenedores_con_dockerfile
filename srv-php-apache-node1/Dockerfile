
# Usa la imagen base de php:apache-bullseye
FROM php:apache-bullseye

# Crea un volumen y establece el directorio de trabajo
# VOLUME /var/www/html
WORKDIR /var/www/html

# Copia el contenido del directorio local a /var/www/html en el contenedor
COPY ./ /var/www/html/


# Expone el puerto 80
EXPOSE 80

# Instala Node.js

RUN apt-get update && apt-get install -y curl wget git build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs


# RUN apt-get update && \
#     apt-get install -y curl wget git build-essential && \
#     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
#     export NVM_DIR="$HOME/.nvm" && \
#     [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && \
#     nvm install 18

# Ejecuta comandos adicionales (por ejemplo, npm i y npm run dev)
RUN npm i
# RUN npm run dev

# Comando para iniciar el servidor Apache cuando se inicie el contenedor
# CMD ["apache2-foreground"]
CMD [ "npm" "run" "dev" ]




