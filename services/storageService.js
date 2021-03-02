export const storageService = {
    load,
    save,
    clear
}

function load(key) {
    const str = localStorage.getItem(key)
    return JSON.parse(str)
}

function save(key, val) {
    const str = JSON.stringify(val)
    localStorage.setItem(key, str)
}

function clear(key) {
    localStorage.removeItem(key)
}