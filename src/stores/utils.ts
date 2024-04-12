import { FileResponse, FolderResponse, NodeType, FileNode } from "src/types"
import { Trie } from "src/utils/Trie";

export const transformTreeResponse = (data: Array<FolderResponse | FileResponse>): FileNode[] => {
  return data.map((item: FileResponse | FolderResponse): FileNode => {
    let node: FileNode;
    if (item.nodeType === NodeType.Folder) {
      node = {
        ...item,
        expanded: false,
        children: transformTreeResponse((item as FolderResponse).children),
      };
    } else {
      node = { ...item as FileResponse };
    }
    return node;
  });
};

export const createLinks = (data: FileNode[], trie: Trie, nodes: Map<number, FileNode>) => {
  data.forEach(item => {
    trie.insert(item);
    nodes.set(item.id, item);
    if ('children' in item) {
      createLinks(item.children, trie, nodes);
    }
  });
};
