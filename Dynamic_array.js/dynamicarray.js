
class DynamicArray {
    #arr;
    #size;
    #capacity;
    #GROWTH = 2;

    constructor(cap = 0, fill = 0) {
        if (cap < 0) throw new Error("Capacity can't be < 0");
        this.#capacity = cap;
        this.#size = cap;
        this.#arr = new Array(cap).fill(fill);
    }

    /* ================= Capacity ================= */
    size() { return this.#size; }
    capacity() { return this.#capacity; }
    empty() { return this.#size === 0; }

    reserve(n) {
        if (n <= this.#capacity) return;
        let newBuffer = new Array(n);
        for (let i = 0; i < this.#size; i++) newBuffer[i] = this.#arr[i];
        this.#arr = newBuffer;
        this.#capacity = n;
    }

    #resize(n) {
        let newBuffer = new Array(n);
        let limit = Math.min(this.#size, n);
        for (let i = 0; i < limit; i++) newBuffer[i] = this.#arr[i];
        if (n < this.#size) this.#size = n;
        this.#arr = newBuffer;
        this.#capacity = n;
    }

    shrinkToFit() { this.#resize(this.#size); }
    clear() { this.#size = 0; }

    /* ================= Element Access ================= */
    at(i) {
        if (i < 0 || i >= this.#size) throw new Error("Index out of bounds");
        return this.#arr[i];
    }

    set(i, value) {
        if (i < 0 || i >= this.#size) throw new Error("Index out of bounds");
        if (typeof value !== 'number') throw new Error("Value must be a number");
        this.#arr[i] = value;
    }

    front() {
        if (this.#size === 0) throw new Error("Array is empty");
        return this.#arr[0];
    }

    back() {
        if (this.#size === 0) throw new Error("Array is empty");
        return this.#arr[this.#size - 1];
    }

    toArray() { return this.#arr.slice(0, this.#size); }

    /* ================= Modifiers ================= */
    pushBack(value) {
        if (typeof value !== 'number') throw new Error("Value must be a number");
        if (this.#size === this.#capacity) {
            let newCapacity = this.#capacity === 0 ? 1 : this.#capacity * this.#GROWTH;
            this.reserve(newCapacity);
        }
        this.#arr[this.#size++] = value;
    }

    popBack() {
        if (this.#size === 0) throw new Error("Array is empty");
        return this.#arr[--this.#size];
    }

    insert(pos, value) {
        if (pos < 0 || pos > this.#size) throw new Error("Invalid position");
        if (typeof value !== 'number') throw new Error("Value must be a number");
        if (this.#size === this.#capacity) {
            let newCapacity = this.#capacity === 0 ? 1 : this.#capacity * this.#GROWTH;
            this.reserve(newCapacity);
        }
        for (let i = this.#size; i > pos; i--) this.#arr[i] = this.#arr[i - 1];
        this.#arr[pos] = value;
        this.#size++;
    }

    erase(pos) {
        if (pos < 0 || pos >= this.#size) throw new Error("Invalid position");
        for (let i = pos; i < this.#size - 1; i++) this.#arr[i] = this.#arr[i + 1];
        this.#size--;
    }

    swap(i, j) {
        if (i < 0 || i >= this.#size || j < 0 || j >= this.#size) throw new Error("Invalid index");
        let temp = this.#arr[i];
        this.#arr[i] = this.#arr[j];
        this.#arr[j] = temp;
    }

    /* ================= Iterators ================= */
    *[Symbol.iterator]() {
        for (let i = 0; i < this.#size; i++) yield this.#arr[i];
    }

    values() { return this[Symbol.iterator](); }

    *keys() {
        for (let i = 0; i < this.#size; i++) yield i;
    }

    *entries() {
        for (let i = 0; i < this.#size; i++) yield [i, this.#arr[i]];
    }

    /* ================= High-order functions ================= */
    forEach(fn) {
        for (let i = 0; i < this.#size; i++) fn(this.#arr[i], i, this);
    }

    map(fn) {
        let result = new DynamicArray();
        for (let i = 0; i < this.#size; i++) result.pushBack(fn(this.#arr[i], i, this));
        return result;
    }

    filter(fn) {
        let result = new DynamicArray();
        for (let i = 0; i < this.#size; i++)
            if (fn(this.#arr[i], i, this)) result.pushBack(this.#arr[i]);
        return result;
    }

    reduce(fn, initial) {
        if (this.#size === 0 && initial === undefined) throw new Error("Reduce of empty array with no initial value");
        let acc, start;
        if (initial !== undefined) { acc = initial; start = 0; }
        else { acc = this.#arr[0]; start = 1; }
        for (let i = start; i < this.#size; i++) acc = fn(acc, this.#arr[i], i, this);
        return acc;
    }

    some(fn) {
        for (let i = 0; i < this.#size; i++) if (fn(this.#arr[i], i, this)) return true;
        return false;
    }

    every(fn) {
        for (let i = 0; i < this.#size; i++) if (!fn(this.#arr[i], i, this)) return false;
        return true;
    }

    find(fn) {
        for (let i = 0; i < this.#size; i++) if (fn(this.#arr[i], i, this)) return this.#arr[i];
        return undefined;
    }

    findIndex(fn) {
        for (let i = 0; i < this.#size; i++) if (fn(this.#arr[i], i, this)) return i;
        return -1;
    }

    includes(value) {
        for (let i = 0; i < this.#size; i++) if (this.#arr[i] === value) return true;
        return false;
    }

    /* ================= Extensions ================= */
    reverse() {
        let left = 0, right = this.#size - 1;
        while (left < right) {
            let temp = this.#arr[left];
            this.#arr[left++] = this.#arr[right];
            this.#arr[right--] = temp;
        }
    }

    sort(compareFn = (a, b) => a - b) {
        for (let i = 1; i < this.#size; i++) {
            let key = this.#arr[i];
            let j = i - 1;
            while (j >= 0 && compareFn(this.#arr[j], key) > 0) {
                this.#arr[j + 1] = this.#arr[j];
                j--;
            }
            this.#arr[j + 1] = key;
        }
    }

    clone() {
        let newArr = new DynamicArray(0);
        for (let i = 0; i < this.#size; i++) newArr.pushBack(this.#arr[i]);
        return newArr;
    }

    equals(other) {
        if (!(other instanceof DynamicArray)) return false;
        if (this.#size !== other.size()) return false;
        for (let i = 0; i < this.#size; i++) if (this.#arr[i] !== other.at(i)) return false;
        return true;
    }
}
