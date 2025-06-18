const express = require('express');
const router = express.Router();
const store = require('../data/store');

// Validation helper
function validateItem(item) {
  if (!item.name || !item.description) {
    return 'Name and description are required';
  }
  return null;
}

// GET all items
router.get('/', (req, res) => {
  res.json(store.getAll());
});

// GET single item
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = store.getById(id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// POST new item
router.post('/', (req, res) => {
  const error = validateItem(req.body);
  if (error) return res.status(400).json({ error });
  const newItem = store.add(req.body);
  res.status(201).json(newItem);
});

// PUT update item
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const error = validateItem(req.body);
  if (error) return res.status(400).json({ error });

  const updated = store.update(id, req.body);
  if (!updated) return res.status(404).json({ error: 'Item not found' });
  res.json(updated);
});

// DELETE item
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const success = store.delete(id);
  if (!success) return res.status(404).json({ error: 'Item not found' });
  res.json({ message: 'Item deleted' });
});

module.exports = router;
