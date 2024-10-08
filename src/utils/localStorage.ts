function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key: string) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export { setLocalStorage, getLocalStorage, removeLocalStorage };
