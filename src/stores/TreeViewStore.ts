import { makeObservable, observable, action, computed } from "mobx"
import { APIs } from "src/constants";
import { mockFetch } from "src/mockFetch";
import { FileNode, Folder } from "src/types";
import { Trie } from "src/utils/Trie";
import { createLinks, transformTreeResponse } from "./utils";
import { createContext, useContext } from "react";

export class TreeViewStore {
  root: FileNode[];
  nodes: Map<number, FileNode>;
  trie: Trie; // searching file by O(n) where n is fileName.length
  search: string;

  constructor () {
    makeObservable(this, {
      root: observable,
      search: observable,
      fetchTree: action,
      onExpandFolder: action,
      onSearch: action,
      current: computed,
    });

    this.root = [];
    this.trie = new Trie();
    this.nodes = new Map();
    this.search = '';
    this.fetchTree();
  }

  async fetchTree () {
    try {
      const res = await mockFetch(APIs.TREE);
      if (res.status === 200) {
        const json = await res.json();
        this.root = transformTreeResponse(json.data);
        createLinks(this.root, this.trie, this.nodes);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async fetchFolder (id: number) {
    try {
      const res = await mockFetch(`${APIs.FOLDERS}/${id}`);
      if (res.status === 200) {
        const json = await res.json();
        const node = transformTreeResponse(json.data);
        createLinks(node, this.trie, this.nodes);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async removeFolder (id: number) {
    try {
      const res = await mockFetch(`${APIs.FOLDERS}/${id}`, { method: 'DELETE' });
      if (res.status === 200) {
        this.trie.remove(this.nodes.get(id));
        this.nodes.delete(id);
        const json = await res.json();
        const parentNode = transformTreeResponse(json.data);
        createLinks(parentNode, this.trie, this.nodes);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async onExpandFolder (id: number, flag?: boolean) {
    const item = (this.nodes.get(id) as Folder);
    if (item.permission) {
      if (!item.children && !item.isEmpty) await this.fetchFolder(item.id);
      (item as Folder).expanded = flag ?? !(item as Folder).expanded;
    }
  }

  onSearch (name: string = "") { // Search should be on backend
    this.search = name;
  }

  get current(): FileNode[] {
    if (this.search) {
      const nodes = this.trie.search(this.search);
      if (nodes) {
        return [...nodes].map(([_, node]) => node);
      }
      return [];
    }
    return this.root;
  }
}

export const StoreContext = createContext<TreeViewStore | null>(null);

export const useTreeViewStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you. (c) Michel Weststrate');
  }
  return store;
};
