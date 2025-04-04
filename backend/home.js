const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../data/produtos.json');

router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dbPath));
  res.json(data);
});

module.exports = router;
