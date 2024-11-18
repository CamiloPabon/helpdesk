const express = require('express');
const router = express.Router();
const db = require('../database');

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { empresa, descripcion, fecha, estado } = req.body;

  if (!empresa || !descripcion || !fecha || !estado) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  db.run(
    `UPDATE incidencias SET empresa = ?, descripcion = ?, fecha = ?, estado = ? WHERE id = ?`,
    [empresa, descripcion, fecha, estado, id],
    function (err) {
      if (err) {
        console.error('Error al actualizar incidencia:', err.message);
        return res.status(500).json({ error: 'Error al actualizar la incidencia' });
      }

      res.json({ id, empresa, descripcion, fecha, estado });
    }
  );
});

module.exports = router;
