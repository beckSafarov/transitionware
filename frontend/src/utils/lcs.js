export const getStore = (storeName) => JSON.parse(localStorage.getItem(storeName));
export const setStore = (storeName, data) => localStorage.setItem(storeName, JSON.stringify(data));
export const clearStore = (storeName) => localStorage.removeItem(storeName);
  