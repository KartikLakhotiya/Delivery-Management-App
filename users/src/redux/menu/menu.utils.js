export const incItem = (menuItems, id) => {
  const existingItem = menuItems.find((item) => item.id === id);
  if (existingItem) {
    return menuItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...menuItems];
};

export const decItem = (menuItems, id) => {
  const existingItem = menuItems.find((item) => item.id === id);
  if (existingItem) {
    return menuItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
  }
  return [...menuItems];
};

export const removeItem = (menuItems, id) => {
  const existingItem = menuItems.find((item) => item.id === id);
  if (existingItem) {
    return menuItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity - item.quantity }
        : item
    );
  }
  return [...menuItems];
};

export const searchItems = (menuItems, searchTerm) => {
  menuItems.filter((item) => {
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true;
    }
  });
};

export const clear = (menuItems) => {
  return menuItems.map((item) => ({ ...item, quantity: 0 }));
};

export const bookmark = (menuItems, id) => {
  const existingItem = menuItems.find((item) => item.id === id);
  if (existingItem) {
    return menuItems.map((item) =>
      item.id === id ? { ...item, bookmark: !item.bookmark } : item
    );
  }
  return [...menuItems];
};
