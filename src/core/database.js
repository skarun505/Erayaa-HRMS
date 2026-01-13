// Local Storage Database Layer
class LocalDB {
    constructor(dbName) {
        this.dbName = dbName;
    }

    get(key) {
        const data = localStorage.getItem(`${this.dbName}_${key}`);
        return data ? JSON.parse(data) : null;
    }

    set(key, value) {
        localStorage.setItem(`${this.dbName}_${key}`, JSON.stringify(value));
    }

    remove(key) {
        localStorage.removeItem(`${this.dbName}_${key}`);
    }

    getAll(prefix) {
        const results = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(`${this.dbName}_${prefix}`)) {
                const value = localStorage.getItem(key);
                results.push(JSON.parse(value));
            }
        }
        return results;
    }

    clear() {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith(this.dbName)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
    }
}

export const db = new LocalDB('hrms');
