import { Box, BoxProps } from "@mui/material"
import { FileNode } from "src/types";
import { observer } from "mobx-react-lite";
import { TreeFabric } from "src/components";

interface TreeViewProps extends BoxProps{
  nodes: FileNode[];
  tabIndex: number;
}

const TreeView: React.FC<TreeViewProps> = observer(({ tabIndex, nodes, ...props }) => {
  return (
    <Box
      {...props}
      display="flex"
      flexDirection="column"
      gap="2px"
      component="ul"
      role="group"
    >
        {nodes.map((item, i) => (
          <Box display="flex" component="li" key={item.id} role="item">
            <TreeFabric tabIndex={tabIndex + i} item={item} />
          </Box>
        ))}
    </Box>
  );
});

export default TreeView;
