const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 82;

const db = mysql.createConnection({
	host: "172.17.0.3",
	user: 'root',
	password: 'pass',
	database: 'prueba',
});

// Conectar a la base de datos MySQL
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Ruta raíz que realiza una consulta SQL y responde con una tabla HTML
app.get('/', (req, res) => {
    // Realiza una consulta SQL para obtener datos de la tabla 'tu_tabla'
    const query = 'SELECT * FROM alumnos';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta SQL:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        // Genera la tabla HTML con los datos de la consulta
        let tableHtml = '<table><tr><th>ID</th><th>Apellidos 2</th><th>Nombres</th><th>DNI</th></tr>';
        result.forEach((row) => {
            tableHtml += `<tr><td>${row.id}</td><td>${row.apellidos}</td><td>${row.nombres}</td><td>${row.dni}</td></tr>`;
        });
        tableHtml += '</table>';

        // Envía la tabla HTML como respuesta
        res.send(tableHtml);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}. Ir a http://localhost:${port}`);
});
