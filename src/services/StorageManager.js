class StorageManager {
    constructor() {
        this.storage = localStorage;
    }

    get(key, defaultValue = 0) {
        const storedValue = this.storage.getItem(key);
    
        if (storedValue !== null) {
            // Check if the value is a valid integer
            if (/^\d+$/.test(storedValue)) {
                return parseInt(storedValue, 10);
            }

            // Check if the value is a valid float with one dot
            if (/^\d+\.\d+$/.test(storedValue)) {
                return parseFloat(storedValue);
            }

            // If neither, return as a string
            return storedValue;
        }

        return defaultValue;
    }

    getInt(key, defaultValue = 0) {
        const storedValue = this.storage.getItem(key);
        return parseInt(storedValue, 10) || defaultValue;
    }

    getFloat(key, defaultValue = 0) {
        const storedValue = this.storage.getItem(key);
        return parseFloat(storedValue) || defaultValue;
    }

    getString(key, defaultValue = '') {
        const storedValue = this.storage.getItem(key);
        return storedValue || defaultValue;
    }

    update(key, value) {
        localStorage.setItem(key, value);
    }
}


export default new StorageManager();