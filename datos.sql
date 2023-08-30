
-- Crear la base de datos "prueba"
CREATE DATABASE IF NOT EXISTS prueba;

-- Usar la base de datos "prueba"
USE prueba;

-- Crear la tabla "alumnos"
CREATE TABLE IF NOT EXISTS alumnos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    apellidos VARCHAR(200),
    nombres VARCHAR(200),
    dni INT(11)
);

-- Insertar registros en la tabla "alumnos"
INSERT INTO alumnos (apellidos, nombres, dni) VALUES
    ('García', 'Juan', 345678901),
    ('López', 'María', 456789012),
    ('Martín', 'Velarde', 35987931),
    ('Ana', 'Jerez', 684872454),
    ('Erika', 'Otthofer', 456789012),
    ('Martínez', 'Carlos', 367890123);