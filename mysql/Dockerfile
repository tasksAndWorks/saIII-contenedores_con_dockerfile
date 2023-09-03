FROM mysql:debian

ENV MYSQL_ROOT_PASSWORD=pass
ENV MYSQL_DATABASE=prueba

# Copiamos el fichero datos.sql dentro del directorio `/docker-entrypoint-initdb.d`.
# Cuando se inicia un contenedor por primera vez, se creará e inicializará una nueva base de datos con el nombre especificado en las variables de configuración proporcionadas.  Además, ejecutará archivos con extensiones .sh, .sql y .sql.gz. que se encuentran en `/docker-entrypoint-initdb.d`
COPY ./ /docker-entrypoint-initdb.d

EXPOSE 3306
