import { FileNode } from "src/types"

const OFFSET = 97;

class TrieNode {
    next: TrieNode[];
    value: Map<number, FileNode>;
    constructor() {
        this.next = new Array(27);
        this.value = new Map();
    }
}

export class Trie {
    root: TrieNode;
    constructor() {
        this.root = new TrieNode();
    }

    insert(item: FileNode): void {
        const _insert = (node: TrieNode, depth: number): TrieNode => {
            if (!node) node = new TrieNode();
            node.value.set(item.id, item);
            if (depth < item.name.length) {
                const index = item.name.charCodeAt(depth) - OFFSET;
                node.next[index] = _insert(node.next[index], depth + 1);
            }
            return node;
        }

        this.root = _insert(this.root, 0);
    }

    _searchNode(prefix: string): TrieNode | null {
        let depth = 0;
        let node = this.root;
        while (depth < prefix.length) {
            const index = prefix.charCodeAt(depth) - OFFSET;
            if (node?.next[index]) {
                node = node?.next[index];
                depth++;
            } else {
                return null;
            }
        }
        return node;
    }

    search(prefix: string): Map<number, FileNode> | undefined {
        const node = this._searchNode(prefix);
        return node?.value;
    }

    remove(item: FileNode | undefined) {
        if (!item) return;
        let depth = 0;
        const prefix = item.name;
        let node = this.root;
        while (depth < prefix.length) {
            const index = prefix.charCodeAt(depth) - OFFSET;
            node?.value.delete(item.id);
            if (node?.next[index]) {
                node = node?.next[index];
                depth++;
            }
        }
    }
}
