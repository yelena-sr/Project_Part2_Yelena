const express = require('express');
const cors = require('cors');
const items = require('./data/items');

const app = express();
app.use(cors());
app.use(express.json());

// current index in the items array
let index = 0;

// GET /item – returns the current item
app.get('/item', (req, res) => {
  res.json({
    index,
    item: items[index],
    total: items.length
  });
});

// GET /item/next – move to next item, wrap at the end
app.get('/item/next', (req, res) => {
  index = (index + 1) % items.length;
  res.json({
    index,
    item: items[index],
    total: items.length
  });
});

// GET /item/prev – move to previous item, wrap at the beginning
app.get('/item/prev', (req, res) => {
  index = (index - 1 + items.length) % items.length;
  res.json({
    index,
    item: items[index],
    total: items.length
  });
});

// (Optional) GET /item/:id – return item by index
app.get('/item/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id) || id < 0 || id >= items.length) {
    return res.status(404).json({ error: 'Not found' });
  }

  index = id;
  res.json({
    index,
    item: items[index],
    total: items.length
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});