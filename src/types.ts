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
