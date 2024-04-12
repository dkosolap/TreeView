import { observer } from "mobx-react-lite"
import { FileNode, Folder, NodeType, File } from "src/types";
import { FolderItem } from "src/components";
import FileItem from "./FileItem";

interface Props {
  item: FileNode;
  tabIndex: number;
}

const TreeFabric: React.FC<Props> = observer(({ item, tabIndex }) => {
  switch (item.nodeType) {
    case NodeType.Folder:
      return <FolderItem tabIndex={tabIndex} {...item as Folder} />;
    case NodeType.File:
      return <FileItem tabIndex={tabIndex} {...item as File} />;
    default:
      return null;
  }
});

export default TreeFabric;
