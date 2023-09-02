# Introducción
> Este repo fue desarrollado para responder a ciertas cuestiones planteadas por la materia *"Seminario de Actualización III"* del **Instituto Politécnico de Formosa**.
> Se trata del manejo y administración de servidores ejecutándose en contenedores de **Docker** con un balanceador de carga **HaProxy**, también corriendo en un contenedor. Estos servidores a su vez hacen una consulta a una base de datos **MySql** alojada, otra vez, dentro de un contenedor de Docker.

La parte principal del trabajo se basa en la ejecución de los siguientes dos comandos:
* Construcción de imagen. Situarse en el directorio donde se encuentra el Dockerfile y ejecutar:
```
docker build -t <nombre_imagen> .
```

* Luego crear el contenedor utilizando esta imagen:
```
docker run -d -p <puerto_maquina_local>:<puertro_que_expone_el_contenedor> --name <nombre_contendor> <imagen_base>
```

# Desarrollo

### Creación imagen y contenedor MySQL

##### Dockerfile:
```
FROM mysql:debian

ENV MYSQL_ROOT_PASSWORD=pass
ENV MYSQL_DATABASE=prueba

COPY datos.sql /docker-endpoint-initdb.d/datos.sql

EXPOSE 3306

```

##### Comandos:

* Construcción de la imagen. Situarse en el directorio donde se encuentra el Dockerfile y ejecutar:
```
docker build -t img-mysql .
```

* Luego crear el contenedor del servidor utilizando esta imagen:
```
docker run -d -p 3306:3306 -v "C:\sqlVol":/var/lib/mysql --name misql img-mysql
```

* Ingresamos al contenedor:
```
docker exec -it misql bash
```

* Ejecutamos el servidor de NodeJS que se encuentra en el segundo contenedor:
```
mysql -u root -p
```

E ingresamos nuestra contraseña, en este caso será:
```
pass
```

Ya que esta es la contraseña que establecimos en nuestro Dockerfile al crear la imagen.

* Verificamos que nuestra base de datos, y la tabla del fichero ![datos.sql](./mysql/datos.sql) se hayan creado correctamente:
```
show databases;
```

```
use pueba;
```

```
show tables;
```

* Si no existen tales datos, los agregamos a mano:
```
-- Crear la base de datos "prueba"
CREATE DATABASE IF NOT EXISTS prueba;

USE prueba;

CREATE TABLE IF NOT EXISTS alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    apellidos VARCHAR(200),
    nombres VARCHAR(200),
    dni INT(11)
);

INSERT INTO alumnos (apellidos, nombres, dni) VALUES
    ('Luffy', 'Monkey D.', 123456789),
    ('Ronoroa', 'Zoro', 123456789),
    ('-', 'Nami', 123123213),
    ('-', 'Usopp', 456456456),
    ('-', 'Sanji', 456456464),
    ('Chopper', 'Tony Tony', 456456789),
    ('Robin', 'Nico', 12332131),
    ('-', 'Franky', 123789798),
    ('-', 'Brook', 00000000);
```

### Creación imágenes y contenedores *PHP:APACHE-BULLSEYE*

#### Primer servidor con PHP

##### Dockerfile:

```
# Imagen base de php:apache-bullseye
FROM php:apache-bullseye

# Actualizamos los repositorios y luego instalamos el paquete necesario

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

```

##### Comandos:
* Para construir una imagen:
	* Situarse en el directorio donde se encuentra el Dockerfile y ejecutar:
```
docker build -t img-srv1 .
```

* Luego crear el contenedor del servidor utilizando esta imagen:
```
docker run -d -p 8097:80 --name SrvD1 img-srv1
```


#### Segundo servidor con PHP
##### Dockerfile:

```

# Imagen base de php:apache-bullseye
FROM php:apache-bullseye

# Actualizamos los repositorios y luego instalamos el paquete necesario

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

```



##### Comandos:
* Para construir una imagen:
	* Situarse en el directorio donde se encuentra el Dockerfile y ejecutar:
	```
	docker build -t img-srv2 .
	```
    
* Luego crear el contenedor del servidor utilizando esta imagen:
	```
	docker run -d -p 8095:80 --name SrvD2 img-srv2
	```



### Creación imágenes y contenedores *PHP:APACHE-BULLSEYE + **NODEJS***

#### Primer servidor con NodeJS

##### Dockerfile:
```
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
```


##### Comandos:

* Construcción de la imagen. Situarse en el directorio donde se encuentra el Dockerfile y ejecutar:
```
docker build -t img-srv1-node .
```
* Luego crear el contenedor del servidor utilizando esta imagen:
```
docker run -d -p 8090:81 --name SrvD1Node img-srv1-node
```
	- Aquí el puerto del contenedor que debemos mapear es el mismo que se utiliza en el código .js que crea el servidor. Ver fichero ![server.js]()

* Ingresamos al contenedor:
```
docker exec -it SrvD2Node bash
```

* Ejecutamos el servidor de NodeJS que se encuentra en el segundo contenedor:
```
npm run dev
```

#### Segundo servidor con NodeJS
##### Dockerfile:
```

# Utilizamos la imagen base de php:apache-bullseye
FROM php:apache-bullseye

# Establecemos el directorio de trabajo
WORKDIR /var/www/html

# Copiamos el contenido del directorio local a /var/www/html en el contenedor
COPY ./ /var/www/html/

# Exponemos el puerto 82. Este puerto debe ser el mismo que se utiliza para crear el servidor y, al crear el contenedor, cuando hacemos el mapeo de puertos, el puerto del contenedor debe ser igual al puerto expuesto aquí.
EXPOSE 82

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

```

Aquí seguimos la instalación de Node de acuerdo a los pasos dados en: https://github.com/nodesource/distributions/blob/master/README.md#debian-versions.
Se llegó a este link leyendo la documentación oficial(https://nodejs.org/es/download/package-manager).

##### Comandos:
* Construcción de la imagen. Situarse en el directorio donde se encuentra el Dockerfile y ejecutar:
```
docker build -t img-srv2-node .
```
* Luego crear el contenedor del servidor utilizando esta imagen:
```
docker run -d -p 8091:82 --name SrvD2Node img-srv2-node
```
	- Aquí el puerto del contenedor que debemos mapear es el mismo que se utiliza en el código .js que crea el servidor. Ver fichero ![server.js]()

* Ingresamos al contenedor:
```
docker exec -it SrvD2Node bash
```

* Ejecutamos el servidor de NodeJS que se encuentra en el segundo contendor:
```
npm run dev
```


# Procedimientos

A continuación daremos una lista de pasos para ejecutar y probar el funcionamiento del balanceador y la conexión de los servidores (realizados con NodeJS corriendo dentro de los contenedores de php:apache-bullseye) con la base de datos (creada en un contenedor de mysql):

1. Creamos la imagen del servidor con Node 1
	- Nos situamos en el directorio donde tenemos nuestro Dockerfile
```
docker build -t img-srv-node1 .
```

2. Creamos el contenedor del servidor con Node 1
```
docker run -d -p 8090:81 --name SrvD1Node img-srv-node1
```

3. Inspeccionamos la Ip del contendor
```
docker inspect SrvD1Node
```

4. Creamos la imagen del servidor con Node 2
	- Nos situamos en el directorio donde tenemos nuestro Dockerfile
```
docker build -t img-srv-node2 .
```

5. Creamos el contenedor del servidor con Node 2
```
docker run -d -p 8091:82 --name SrvD2Node img-srv-node2
```

6. Inspeccionamos la Ip del contendor
```
docker inspect SrvD2Node
```

7. Creamos la imagen del balanceador
	- Nos situamos en el directorio donde tenemos nuestro Dockerfile
```
docker build -t img-bal .
```

8. Creamos el contenedor del balanceador
```
docker run -d -p 8085:80 --name Bal img-bal
```

10. Ingresamos al contenedor del servidor con Node 1
```
docker exec -it SrvD1Node bash
```

12. Levantamos el servidor
```
npm run dev
```

13. Ingresamos al contenedor del servidor con Node 2
```
docker exec -it SrvD2Node bash
```

14. Levantamos el servidor
```
npm run dev
```
