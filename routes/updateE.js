const express = require('express');
const router = express.Router();
const db = require('../database');

// Actualizar solo el estado de una incidencia
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!estado) {
    return res.status(400).json({ error: 'El estado es requerido' });
  }

  db.run(
    `UPDATE incidencias SET estado = ? WHERE id = ?`,
    [estado, id],
    function (err) {
      if (err) {
        console.error('Error al actualizar el estado:', err.message);
        return res.status(500).json({ error: 'Error al actualizar el estado' });
      }

      res.json({ id, estado });
    }
  );
});

module.exports = router;
