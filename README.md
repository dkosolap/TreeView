# View Tree

## Run

1. `pnpm install`
2. `pnpm run dev`


## Function requirements

- Show items by hierarchy
    - It can be a folder
        - ✅ expanded
        - ✅ collapsed
        - ✅ contain folders/files
        - ✅ empty
        - ✅not permission
    - It can be a file
        - ✅ difference types: would be image, video, song, other
        - ✅ not permission
- Interaction
    - ✅ can expand/collapse folders
    - can move folder/file
    - can delete folder/file
- ✅ Search by folder/file name

## No function req.

- ✅ Performance: Fast loading/ instant user feedback / fast searching
- ✅ Accessibility: mouse/keyboard
- Store expand/collapse in localStorange
- Testing
- Error handling

## API & Interface

```tsx
export enum PermissionFlags {
  NotAccessible = 0,
  Read = 1,
  Edit = 2,
  Delete = 3,
}

export interface FileSystem {
	root: Folder;
	currentNode: Folder;
	activeFile: null | File;
}

export type FileNode = Folder | File;

export enum NodeType {
  Folder = "Folder",
  File = "File",
}

export type NodeTypeKey = keyof typeof NodeType;

export enum FileType {
  Video = "Video",
  Sound = "Sound",
  Image = "Image",
  File = "File",
}

export type FileTypeKey = keyof typeof FileType;

export interface FolderResponse {
	name: string;
	id: number;
	parentId: number | null;
	children: Array<FolderResponse | FileResponse>
	permission: PermissionFlags;
	createdAt: string;
	modifiedAt: string;
	nodeType: NodeTypeKey;
	isEmpty: boolean;
}

export interface Folder extends FolderResponse {
	children: FileNode[];
	expanded: boolean;
}

export interface FileResponse {
	name: string;
	id: number;
	parentId: number | null;
	type: FileTypeKey;
	url: string;
	permission: PermissionFlags;
	createdAt: string;
	modifiedAt: string;
	nodeType: NodeTypeKey;
}

export interface File extends FileResponse {}

```

- ✅`GET: /tree`
    
    ```tsx
    interface Req {
    	depth?: number;
    }
    
    interface Res  {
    	status: string;
    	data: FolderResponse[];
    }
    ```
    
- ✅`GET: /folders/{folderId}`
    
    ```tsx
    interface Res {
    	status: string;
    	data: FolderResponse;
    }
    ```
    
- `GET: /files/{fileId}`
    
    ```tsx
    interface Res {
    	status: string;
    	data: FileResponse;
    }
    ```
    
- `PUT: /items/move/{itemId}`
    
    ```tsx
    interface Req {
    	newParentId: number;
    }
    
    interface Res {
    	status: string;
    	data: FolderResponse; //parent folder
    }
    ```
    
- `DELETE: /folders/{folderId}`
    
    ```tsx
    interface Res {
    	status: string;
    	data: FolderResponse; //parent folder
    }
    ```
    
- `DELETE: /files/{fileId}`
    
    ```tsx
    interface Res {
    	status: string;
    	data: FolderResponse; //parent folder
    }
    ```
    

## Testing

- Unit testing
- Snapshots

## Optimization

- React.js
- Mobx
