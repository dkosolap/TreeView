import { observer } from "mobx-react-lite";
import { Box, BoxProps, Icon, Typography, styled } from "@mui/material";
import {
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  FolderOff as FolderOffIcon,
  KeyboardArrowRight,
} from '@mui/icons-material';
import { Folder } from "src/types";
import { useTreeViewStore } from "src/stores/TreeViewStore";
import { TreeView } from ".";
import { KEYBOARD_KEY } from "src/constants";

interface Props extends Folder, Omit<BoxProps, 'children' | 'id'> {
  tabIndex: number;
}

const Item = styled(Box)`
  transition: background-color 0.2s;
  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
  &:active {
    background-color: rgba(0,0,0,0.2);
  }
`;

const KeyboardArrowRightIcon = styled(KeyboardArrowRight)`
  transition: transform 0.2s;
  &.expanded {
    transform: rotate(90deg);
  }
`;


const FolderItem: React.FC<Props> = observer(({ name, expanded, permission, id, children, tabIndex, isEmpty }) => {
  const store = useTreeViewStore();
  let icon = FolderIcon;

  if (expanded) {
    icon = FolderOpenIcon;
  }

  if (!permission) {
    icon = FolderOffIcon;
  }

  const onClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    if (permission && !isEmpty) {
      store.onExpandFolder(id)
    }
  };

  const onKeyUp: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (permission && children.length) {
    switch(event.key) {
      case KEYBOARD_KEY.ENTER:
      case KEYBOARD_KEY.SPACE:
        store.onExpandFolder(id);
        break;
      case KEYBOARD_KEY.ARROWRIGHT:
          store.onExpandFolder(id, true);
          break;
      case KEYBOARD_KEY.ARROWLEFT:
        store.onExpandFolder(id, false);
        break;
      }
    }
  };

  return (
    <Box width="100%">
      <Item
        display="flex"
        gap="2px"
        tabIndex={tabIndex}
        padding="10px"
        borderRadius="5px"
        width="100%"
        sx={permission ? {cursor: 'pointer'} : {
          color: 'gray',
          pointerEvents: 'none',
        }}
        onKeyUp={onKeyUp}
        onClick={onClick}
      >
        <Icon
          fontSize="small"
          color={(permission && !isEmpty) ? undefined : 'disabled'}
          component={KeyboardArrowRightIcon}
          className={expanded ? 'expanded' : ''}
          />
        <Icon fontSize="small" component={icon}/>
        <Typography>{name}</Typography>
      </Item>
      {expanded && <TreeView nodes={children} tabIndex={tabIndex+1}/>}
    </Box>
  );
});

export default FolderItem;
