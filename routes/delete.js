const express = require('express');
const router = express.Router();
const db = require('../database');

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM incidencias WHERE id = ?`, [id], function (err) {
    if (err) {
      console.error('Error al eliminar incidencia:', err.message);
      return res.status(500).json({ error: 'Error al eliminar la incidencia' });
    }

    res.status(204).send();
  });
});

module.exports = router;
