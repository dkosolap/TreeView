import { observer } from "mobx-react-lite";
import { useTreeViewStore } from "src/stores/TreeViewStore";
import { Search, TreeView } from ".";
import { Box } from "@mui/material";

const Sidebar: React.FC = observer((props) => {
  const treeViewStore = useTreeViewStore();
  return (
    <Box padding="20px" gap="5px" borderRight="1px solid #e5eaf2" height="100vh" overflow="auto" position="sticky">
        <Search />
        <TreeView paddingInlineStart="0" {...props} nodes={treeViewStore.current} tabIndex={1} />
    </Box>
  );
});

export default Sidebar;
