let storagePlace = {}

export function set(key, value) {
  storagePlace = {
    ...storagePlace,
    [key]: value,
  }
}

export function get(key) {
  return storagePlace && storagePlace[key]
}

export function clear(key) {
  if (storagePlace && storagePlace[key]) {
    delete storagePlace[key]
  }
}

export function clearAll() {
  storagePlace = {}
}

export default {
  set, get, clear, clearAll,
}
