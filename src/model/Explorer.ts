export type TExplorerItem = {
    name: string;
    path: string;
    treeId: number;
    deep: number;
    // type: "folder" | "file";
    type: string;
    items?: TExplorerItem[];
    size?: number;
    md5?: number;
    mimeType?: number;
    createTime?: number;
  };
  
type AddItemActionType = {
    treeId: number;
    name: string;
    type: "folder" | "file";
};