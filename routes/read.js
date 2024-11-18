const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  db.all('SELECT * FROM incidencias', [], (err, rows) => {
    if (err) {
      console.error('Error al obtener incidencias:', err.message);
      return res.status(500).json({ error: 'Error al obtener las incidencias' });
    }
    res.json(rows);
  });
});

module.exports = router;
