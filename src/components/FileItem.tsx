import { observer } from "mobx-react-lite";
import { Box, BoxProps, Icon, Typography, styled } from "@mui/material";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { File, FileType, FileTypeKey } from "src/types";

interface Props extends File, Omit<BoxProps, 'children' | 'id'> {
  tabIndex: number;
}

const getIcon = (type: FileTypeKey) => {
  if (type === FileType.Image) {
    return ContactPageIcon;
  }
  if (type === FileType.Sound) {
    return AudioFileIcon;
  }
  if (type === FileType.Video) {
    return VideoFileIcon;
  }
  return InsertDriveFileIcon;
};

const Item = styled(Box)`
  display: flex;
  padding: 10px;
  gap: 2px;
  width: 100%;
  border-radius: 5px;
  transition: background-color 0.2s;
  &:hover {
    background-color: rgba(0,0,0,0.1);
  }
  &:active {
    background-color: rgba(0,0,0,0.2);
  }
`;


const FileItem: React.FC<Props> = observer(({ name, type, tabIndex, permission }) => {
  return (
    <Item
      tabIndex={tabIndex}
      sx={permission ? {cursor: 'pointer'} : {
        color: 'gray',
        pointerEvents: 'none',
      }}
      >
      <Icon fontSize="small" component={getIcon(type)}/>
      <Typography>{name}</Typography>
    </Item>
  )
});

export default FileItem;
