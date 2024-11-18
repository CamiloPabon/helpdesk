const express = require('express');
const path = require('path');
const app = express();

const createRoute = require('./routes/create');
const readRoute = require('./routes/read');
const updateRoute = require('./routes/update');
const deleteRoute = require('./routes/delete');
const updateERoute = require('./routes/updateE'); // Nueva ruta para actualizar estado

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/create', createRoute);
app.use('/api/read', readRoute);
app.use('/api/update', updateRoute);
app.use('/api/updateE', updateERoute); // Ruta para actualizar solo el estado
app.use('/api/delete', deleteRoute);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
