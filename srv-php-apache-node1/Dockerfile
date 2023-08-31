
# Usa la imagen base de php:apache-bullseye
FROM php:apache-bullseye

# Crea un volumen y establece el directorio de trabajo
# VOLUME /var/www/html
WORKDIR /var/www/html

# Copia el contenido del directorio local a /var/www/html en el contenedor
COPY ./ /var/www/html/


# Expone el puerto 80
EXPOSE 81

# Instala Node.js
# RUN apt-get update && apt-get install -y curl wget git build-essential && \
#     curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
#     apt-get install -y nodejs

# RUN apt-get update && apt-get install -y curl wget git build-essential && \
#     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash && \
#     nvm install 16

    # export NVM_DIR="$HOME/.nvm" && \
    # [ -s "$NVM_DIR/nvm.sh" ] && \. "NVM_DIR/nvm.sh" && \
    # [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" && \
RUN apt-get update && \
    apt-get install -y curl wget git build-essential && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
# RUN exit
RUN nvm install 16 && \
    npm install

# Ejecuta comandos adicionales (por ejemplo, npm i y npm run dev)
# RUN npm i
# RUN npm run dev

# Actualiza el sistema y luego instala las dependencias necesarias
# RUN apt-get update && apt-get install -y \
#     curl \
#     wget \
#     gnupg \
#     && rm -rf /var/lib/apt/lists/*

# Instala Node.js 16
# RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
# RUN apt-get install -y nodejs

# RUN curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"

# Limpia la lista de paquetes y el caché
# RUN apt-get clean

# Comando para iniciar el servidor Apache cuando se inicie el contenedor
CMD ["apache2-foreground"]
# CMD [ "npm" "run" "dev" ]
