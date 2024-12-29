'use client';

import File from "./File";
import Folder from "./Folder";
import { TExplorerItem } from "@/model/Explorer";

export default (data: TExplorerItem) => {
  if (data.type === "file") return <File {...data} />;
  if (data.type === "folder") return <Folder {...data} />;
  return null;
};