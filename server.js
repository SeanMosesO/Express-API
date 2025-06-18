const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// ✅ In-memory data store
let items = [
  { id: 1, name: 'Laptop', description: 'A powerful device' },
  { id: 2, name: 'Phone', description: 'A smart device' },
];

// ✅ Utility: Validate ID param
function validateId(req, res, next) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID. Must be a number.' });
  }
  req.itemId = id;
  next();
}

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// ✅ GET /items - Retrieve all
app.get('/items', (req, res) => {
  res.json(items);
});

// ✅ GET /items/:id - Retrieve by ID
app.get('/items/:id', validateId, (req, res) => {
  const item = items.find(i => i.id === req.itemId);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// ✅ POST /items - Create with validation
app.post('/items', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      error: 'Invalid data. "name" and "description" are required.'
    });
  }

  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name,
    description
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// ✅ PUT /items/:id - Update with validation
app.put('/items/:id', validateId, (req, res) => {
  const item = items.find(i => i.id === req.itemId);
  if (!item) return res.status(404).json({ error: 'Item not found' });

  const { name, description } = req.body;
  if (!name && !description) {
    return res.status(400).json({
      error: 'Invalid data. At least one of "name" or "description" is required.'
    });
  }

  if (name) item.name = name;
  if (description) item.description = description;

  res.json(item);
});

// ✅ DELETE /items/:id - Delete by ID
app.delete('/items/:id', validateId, (req, res) => {
  const index = items.findIndex(i => i.id === req.itemId);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  items.splice(index, 1);
  res.status(204).send();
});

// ❌ 404 - Route Not Found
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ⚠️ 500 - General Error Handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
