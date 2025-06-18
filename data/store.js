let items = [];
let idCounter = 1;

module.exports = {
  getAll: () => items,
  getById: (id) => items.find(item => item.id === id),
  add: (item) => {
    item.id = idCounter++;
    items.push(item);
    return item;
  },
  update: (id, updatedItem) => {
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return null;
    items[index] = { id, ...updatedItem };
    return items[index];
  },
  delete: (id) => {
    const index = items.findIndex(item => item.id === id);
    if (index === -1) return false;
    items.splice(index, 1);
    return true;
  }
};
