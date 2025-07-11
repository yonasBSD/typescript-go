//// [tests/cases/conformance/parser/ecmascript5/parserRealSource4.ts] ////

//// [parserRealSource4.ts]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript {

    export class BlockIntrinsics {
        public prototype = undefined;
        public toString = undefined;
        public toLocaleString = undefined;
        public valueOf = undefined;
        public hasOwnProperty = undefined;
        public propertyIsEnumerable = undefined;
        public isPrototypeOf = undefined;

        constructor () {
            // initialize the 'constructor' field
            this["constructor"] = undefined;
        }
    }

    export interface IHashTable {
        getAllKeys(): string[];
        add(key: string, data): boolean;
        addOrUpdate(key: string, data): boolean;
        map(fn: (k: string, v, c) => void , context): void;
        every(fn: (k: string, v, c) => boolean, context): boolean;
        some(fn: (k: string, v, c) => boolean, context): boolean;
        count(): number;
        lookup(key: string): any;
    }

    export class StringHashTable implements IHashTable {
        public itemCount = 0;
        public table = <any>(<any> new BlockIntrinsics());

        public getAllKeys(): string[]{
            var result: string[] = [];
            for (var k in this.table) {
                if (this.table[k] != undefined) {
                    result[result.length] = k;
                }
            }
            return result;
        }

        public add(key: string, data): boolean {
            if (this.table[key] != undefined) {
                return false;
            }
            this.table[key] = data;
            this.itemCount++;
            return true;
        }

        public addOrUpdate(key: string, data): boolean {
            if (this.table[key] != undefined) {
                this.table[key] = data;
                return false;
            }
            this.table[key] = data;
            this.itemCount++;
            return true;
        }

        public map(fn: (k: string, v, c) => void , context) {
            for (var k in this.table) {
                var data = this.table[k];
                if (data != undefined) {
                    fn(k, this.table[k], context);
                }
            }
        }

        public every(fn: (k: string, v, c) => boolean, context) {
            for (var k in this.table) {
                var data = this.table[k];
                if (data != undefined) {
                    if (!fn(k, this.table[k], context)) {
                        return false;
                    }
                }
            }
            return true;
        }

        public some(fn: (k: string, v, c) => boolean, context) {
            for (var k in this.table) {
                var data = this.table[k];
                if (data != undefined) {
                    if (fn(k, this.table[k], context)) {
                        return true;
                    }
                }
            }
            return false;
        }

        public count(): number { return this.itemCount; }

        public lookup(key: string) {
            var data = this.table[key];
            if (data != undefined) {
                return data;
            }
            else {
                return (null);
            }
        }
    }

    // The resident table is expected to reference the same table object, whereas the 
    // transientTable may reference different objects over time
    // REVIEW:  WARNING:  For performance reasons, neither the primary nor secondary table may be null
    export class DualStringHashTable implements IHashTable {

        public insertPrimary = true;

        constructor (public primaryTable: IHashTable,
                                        public secondaryTable: IHashTable) { }

        public getAllKeys(): string[]{
            return this.primaryTable.getAllKeys().concat(this.secondaryTable.getAllKeys());
        }

        public add(key: string, data): boolean {
            if (this.insertPrimary) {
                return this.primaryTable.add(key, data);
            }
            else {
                return this.secondaryTable.add(key, data);
            }
        }

        public addOrUpdate(key: string, data): boolean {
            if (this.insertPrimary) {
                return this.primaryTable.addOrUpdate(key, data);
            }
            else {
                return this.secondaryTable.addOrUpdate(key, data);
            }
        }

        public map(fn: (k: string, v, c) => void , context) {
            this.primaryTable.map(fn, context);
            this.secondaryTable.map(fn, context);
        }

        public every(fn: (k: string, v, c) => boolean, context) {
            return this.primaryTable.every(fn, context) && this.secondaryTable.every(fn, context);
        }

        public some(fn: (k: string, v, c) => boolean, context) {
            return this.primaryTable.some(fn, context) || this.secondaryTable.some(fn, context);
        }

        public count() {
            return this.primaryTable.count() + this.secondaryTable.count();
        }

        public lookup(key: string) {
            var data = this.primaryTable.lookup(key);
            if (data != undefined) {
                return data;
            }
            else {
                return this.secondaryTable.lookup(key);
            }
        }
    }

    export function numberHashFn(key: number): number {
        var c2 = 0x27d4eb2d; // a prime or an odd constant
        key = (key ^ 61) ^ (key >>> 16);
        key = key + (key << 3);
        key = key ^ (key >>> 4);
        key = key * c2;
        key = key ^ (key >>> 15);
        return key;
    }

    export function combineHashes(key1: number, key2: number) {
        return key2 ^ ((key1 >> 5) + key1);
    }

    export class HashEntry {
        public next: HashEntry;

        constructor (public key, public data) { }
    }

    export class HashTable {
        public itemCount: number = 0;
        public table = new HashEntry[];

        constructor (public size: number, public hashFn: (key) =>number,
                    public equalsFn: (key1, key2) =>boolean) {
            for (var i: number = 0; i < this.size; i++) {
                this.table[i] = null;
            }
        }

        public add(key, data): boolean {
            var current: HashEntry;
            var entry: HashEntry = new HashEntry(key, data);
            var val: number = this.hashFn(key);
            val = val % this.size;

            for (current = this.table[val]; current != null ; current = current.next) {
                if (this.equalsFn(key, current.key)) {
                    return false;
                }
            }
            entry.next = this.table[val];
            this.table[val] = entry;
            this.itemCount++;
            return true;
        }

        public remove(key) {
            var current: HashEntry;
            var val: number = this.hashFn(key);
            val = val % this.size;
            var result = null;
            var prevEntry: HashEntry = null;

            for (current = this.table[val]; current != null ; current = current.next) {
                if (this.equalsFn(key, current.key)) {
                    result = current.data;
                    this.itemCount--;
                    if (prevEntry) {
                        prevEntry.next = current.next;
                    }
                    else {
                        this.table[val] = current.next;
                    }
                    break;
                }
                prevEntry = current;
            }
            return result;
        }

        public count(): number { return this.itemCount; }

        public lookup(key) {
            var current: HashEntry;
            var val: number = this.hashFn(key);
            val = val % this.size;
            for (current = this.table[val]; current != null ; current = current.next) {
                if (this.equalsFn(key, current.key)) {
                    return (current.data);
                }
            }
            return (null);
        }
    }

    // Simple Hash table with list of keys and values matching each other at the given index
    export class SimpleHashTable {
        private keys = [];
        private values = [];

        public lookup(key, findValue?: boolean) {
            var searchArray = this.keys;
            if (findValue) {
                searchArray = this.values;
            }

            for (var i = 0; i < searchArray.length; i++) {
                if (searchArray[i] == key) {
                    return {
                        key: this.keys[i],
                        data: this.values[i],
                    };
                }
            }
            return null;
        }

        public add(key, data): boolean {
            var lookupData = this.lookup(key);
            if (lookupData) {
                return false;
            }

            this.keys[this.keys.length] = key;
            this.values[this.values.length] = data;

            return true;
        }
    }

}

//// [parserRealSource4.js]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.
///<reference path='typescript.ts' />
var TypeScript;
(function (TypeScript) {
    class BlockIntrinsics {
        prototype = undefined;
        toString = undefined;
        toLocaleString = undefined;
        valueOf = undefined;
        hasOwnProperty = undefined;
        propertyIsEnumerable = undefined;
        isPrototypeOf = undefined;
        constructor() {
            // initialize the 'constructor' field
            this["constructor"] = undefined;
        }
    }
    TypeScript.BlockIntrinsics = BlockIntrinsics;
    class StringHashTable {
        itemCount = 0;
        table = new BlockIntrinsics();
        getAllKeys() {
            var result = [];
            for (var k in this.table) {
                if (this.table[k] != undefined) {
                    result[result.length] = k;
                }
            }
            return result;
        }
        add(key, data) {
            if (this.table[key] != undefined) {
                return false;
            }
            this.table[key] = data;
            this.itemCount++;
            return true;
        }
        addOrUpdate(key, data) {
            if (this.table[key] != undefined) {
                this.table[key] = data;
                return false;
            }
            this.table[key] = data;
            this.itemCount++;
            return true;
        }
        map(fn, context) {
            for (var k in this.table) {
                var data = this.table[k];
                if (data != undefined) {
                    fn(k, this.table[k], context);
                }
            }
        }
        every(fn, context) {
            for (var k in this.table) {
                var data = this.table[k];
                if (data != undefined) {
                    if (!fn(k, this.table[k], context)) {
                        return false;
                    }
                }
            }
            return true;
        }
        some(fn, context) {
            for (var k in this.table) {
                var data = this.table[k];
                if (data != undefined) {
                    if (fn(k, this.table[k], context)) {
                        return true;
                    }
                }
            }
            return false;
        }
        count() { return this.itemCount; }
        lookup(key) {
            var data = this.table[key];
            if (data != undefined) {
                return data;
            }
            else {
                return (null);
            }
        }
    }
    TypeScript.StringHashTable = StringHashTable;
    // The resident table is expected to reference the same table object, whereas the 
    // transientTable may reference different objects over time
    // REVIEW:  WARNING:  For performance reasons, neither the primary nor secondary table may be null
    class DualStringHashTable {
        primaryTable;
        secondaryTable;
        insertPrimary = true;
        constructor(primaryTable, secondaryTable) {
            this.primaryTable = primaryTable;
            this.secondaryTable = secondaryTable;
        }
        getAllKeys() {
            return this.primaryTable.getAllKeys().concat(this.secondaryTable.getAllKeys());
        }
        add(key, data) {
            if (this.insertPrimary) {
                return this.primaryTable.add(key, data);
            }
            else {
                return this.secondaryTable.add(key, data);
            }
        }
        addOrUpdate(key, data) {
            if (this.insertPrimary) {
                return this.primaryTable.addOrUpdate(key, data);
            }
            else {
                return this.secondaryTable.addOrUpdate(key, data);
            }
        }
        map(fn, context) {
            this.primaryTable.map(fn, context);
            this.secondaryTable.map(fn, context);
        }
        every(fn, context) {
            return this.primaryTable.every(fn, context) && this.secondaryTable.every(fn, context);
        }
        some(fn, context) {
            return this.primaryTable.some(fn, context) || this.secondaryTable.some(fn, context);
        }
        count() {
            return this.primaryTable.count() + this.secondaryTable.count();
        }
        lookup(key) {
            var data = this.primaryTable.lookup(key);
            if (data != undefined) {
                return data;
            }
            else {
                return this.secondaryTable.lookup(key);
            }
        }
    }
    TypeScript.DualStringHashTable = DualStringHashTable;
    function numberHashFn(key) {
        var c2 = 0x27d4eb2d; // a prime or an odd constant
        key = (key ^ 61) ^ (key >>> 16);
        key = key + (key << 3);
        key = key ^ (key >>> 4);
        key = key * c2;
        key = key ^ (key >>> 15);
        return key;
    }
    TypeScript.numberHashFn = numberHashFn;
    function combineHashes(key1, key2) {
        return key2 ^ ((key1 >> 5) + key1);
    }
    TypeScript.combineHashes = combineHashes;
    class HashEntry {
        key;
        data;
        next;
        constructor(key, data) {
            this.key = key;
            this.data = data;
        }
    }
    TypeScript.HashEntry = HashEntry;
    class HashTable {
        size;
        hashFn;
        equalsFn;
        itemCount = 0;
        table = new HashEntry[];
        constructor(size, hashFn, equalsFn) {
            this.size = size;
            this.hashFn = hashFn;
            this.equalsFn = equalsFn;
            for (var i = 0; i < this.size; i++) {
                this.table[i] = null;
            }
        }
        add(key, data) {
            var current;
            var entry = new HashEntry(key, data);
            var val = this.hashFn(key);
            val = val % this.size;
            for (current = this.table[val]; current != null; current = current.next) {
                if (this.equalsFn(key, current.key)) {
                    return false;
                }
            }
            entry.next = this.table[val];
            this.table[val] = entry;
            this.itemCount++;
            return true;
        }
        remove(key) {
            var current;
            var val = this.hashFn(key);
            val = val % this.size;
            var result = null;
            var prevEntry = null;
            for (current = this.table[val]; current != null; current = current.next) {
                if (this.equalsFn(key, current.key)) {
                    result = current.data;
                    this.itemCount--;
                    if (prevEntry) {
                        prevEntry.next = current.next;
                    }
                    else {
                        this.table[val] = current.next;
                    }
                    break;
                }
                prevEntry = current;
            }
            return result;
        }
        count() { return this.itemCount; }
        lookup(key) {
            var current;
            var val = this.hashFn(key);
            val = val % this.size;
            for (current = this.table[val]; current != null; current = current.next) {
                if (this.equalsFn(key, current.key)) {
                    return (current.data);
                }
            }
            return (null);
        }
    }
    TypeScript.HashTable = HashTable;
    // Simple Hash table with list of keys and values matching each other at the given index
    class SimpleHashTable {
        keys = [];
        values = [];
        lookup(key, findValue) {
            var searchArray = this.keys;
            if (findValue) {
                searchArray = this.values;
            }
            for (var i = 0; i < searchArray.length; i++) {
                if (searchArray[i] == key) {
                    return {
                        key: this.keys[i],
                        data: this.values[i],
                    };
                }
            }
            return null;
        }
        add(key, data) {
            var lookupData = this.lookup(key);
            if (lookupData) {
                return false;
            }
            this.keys[this.keys.length] = key;
            this.values[this.values.length] = data;
            return true;
        }
    }
    TypeScript.SimpleHashTable = SimpleHashTable;
})(TypeScript || (TypeScript = {}));
