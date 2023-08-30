FROM mysql:debian


ENV MYSQL_ROOT_PASSWORD=pass
ENV MYSQL_DATABASE=prueba

COPY datso.sql /docker-endpoint-initdb.d/datos.sql

EXPOSE 3306
