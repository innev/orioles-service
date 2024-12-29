'use client';

import { useState, type MouseEvent } from "react";
// import { useAppDispatch } from "@/store/useStore";
import { FaFile } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// import { removeItem } from "@/store/fileExplorerSlice";
import { iconsData } from "./constants/fileIcons";
import { TExplorerItem } from "@/model/Explorer";

export default ({ name, deep, treeId }: TExplorerItem) => {
  // const dispatch = useAppDispatch();

  // const handleRemove = () => {
  //   dispatch(removeItem({ treeId }));
  // };

  const [showFileOption, setShowFileOption] = useState(false);

  const handleShowOption = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowFileOption(true);
  };

  const handleHideOption = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowFileOption(false);
  };

  // find file extension
  const getFileExtension = (filename: string) => {
    return filename.split(".").pop();
  };

  // finding the icon for the file extension
  const fileExtension = getFileExtension(name);
  const fileIcon = iconsData.find(icon => icon.name === fileExtension);

  return (
    <div
      className={`${deep === 0 ? '' : 'ml-2'} flex items-center justify-between px-4 py-[2px] w-full cursor-pointer text-xl hover:bg-black/20`}
      onMouseEnter={handleShowOption}
      onMouseLeave={handleHideOption}
    >
      <div className="flex items-center gap-2">
        {
          fileIcon
          ? <span className="text-sm" style={{ color: `${fileIcon.color}` }}>{fileIcon.icon}</span>
          : <FaFile className="text-blue-500 text-sm" />
        }
        <span className="inline-block text-black text-sm">{name}</span>
      </div>
      {showFileOption && (
        <MdDelete className="text-sm text-red-700 cursor-pointer"
          // onClick={handleRemove}
        />
      )}
    </div>
  );
};