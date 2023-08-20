import Dexie, { Table } from 'dexie';
import { indexedDB, IDBKeyRange } from 'fake-indexeddb'

interface Items {
    id: number
}

export class MySubClassedDexie extends Dexie {
    dones!: Table<Items>;
    likes!: Table<Items>;

    constructor() {
        super('done-like');
        // super('done-like', { indexedDB: indexedDB, IDBKeyRange: IDBKeyRange });
        this.version(2).stores({
            dones: 'id',
            likes: 'id',
        });
    }
}

export const db = new MySubClassedDexie();