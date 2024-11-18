const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { empresa, descripcion, fecha } = req.body;
  const estado = 'Sin resolver'; // Estado predeterminado

  if (!empresa || !descripcion || !fecha) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  db.run(
    `INSERT INTO incidencias (empresa, descripcion, fecha, estado) VALUES (?, ?, ?, ?)`,
    [empresa, descripcion, fecha, estado],
    function (err) {
      if (err) {
        console.error('Error al insertar incidencia:', err.message);
        return res.status(500).json({ error: 'Error al crear la incidencia' });
      }

      res.status(201).json({
        id: this.lastID,
        empresa,
        descripcion,
        fecha,
        estado
      });
    }
  );
});

module.exports = router;
