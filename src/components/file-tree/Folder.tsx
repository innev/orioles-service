'use client';

import { MouseEvent, useRef, useState } from "react";
import Explorer from "./Explorer";
// import { useAppDispatch } from "@/store/useStore";
// import { TExplorerData, addItem, removeItem } from "./store/fileExplorerSlice";
import { MdDelete } from "react-icons/md";
import { FaFile, FaFileMedical, FaFolderPlus } from "react-icons/fa";
import { FaFolderOpen, FaFolderClosed } from "react-icons/fa6";
import { TExplorerItem } from "@/model/Explorer";

export default (folderData: TExplorerItem) => {
  // const dispatch = useAppDispatch();
  const [showFolderOption, setShowFolderOption] = useState(false);
  const [showAddFolderInput, setShowAddFolderInput] = useState(false);
  const [isItemsVisible, setIsItemsVisible] = useState(false);
  const [showAddFileInput, setShowAddFileInput] = useState(false);
  const folderRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleShowOption = () => {
    setShowFolderOption(true);
  };

  const handleHideOption = () => {
    setShowFolderOption(false);
  };

  const handleToggleItems = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsItemsVisible(prevState => !prevState);
  };

  const handleAddFolder = (treeId: number) => {
    if (folderRef.current?.value.length === 0) alert("input is empty");
    // dispatch(addItem({ name: folderRef.current!.value, type: "folder", treeId }));

    // hide input and reset value
    setShowAddFolderInput(false);
    folderRef.current!.value = "";
  };

  const handleAddFile = (treeId: number) => {
    if (fileRef.current?.value.length === 0) alert("input is empty");
    // dispatch(addItem({ name: fileRef.current!.value, type: "file", treeId }));

    // hide input and reset value
    setShowAddFileInput(false);
    fileRef.current!.value = "";
  };

  const handleRemoveFolder = () => {
    // dispatch(removeItem({ treeId: folderData.treeId }));
  };

  return (
    <div className={`${folderData.deep === 0 ? '' : 'pl-2'} w-full`}>
      <div
        className="flex items-center justify-between px-4 py-[2px] w-full cursor-pointer hover:bg-black/20"
        onClick={handleToggleItems}
        onMouseEnter={handleShowOption}
        onMouseLeave={handleHideOption}
      >
        <div className="flex items-center gap-2">
          {isItemsVisible ? <FaFolderOpen className="text-yellow-500 text-sm"/> : <FaFolderClosed className="text-yellow-500 text-sm" />}
          {/* <span className="inline-block text-blue-100 text-2xl">{folderData.name}</span> */}
          <span className="inline-block text-black text-sm">{folderData.name}</span>
        </div>
        {showFolderOption && (
          <div className="flex items-center gap-3">
            <FaFileMedical
              className="cursor-pointer text-sm text-blue-700 hover:text-blue-800"
              onClick={() => {
                setShowAddFolderInput(false);
                setShowAddFileInput(true);
              }}
            />
            <FaFolderPlus
              className="cursor-pointer text-sm text-green-700 hover:text-green-800"
              onClick={() => {
                setShowAddFileInput(false);
                setShowAddFolderInput(true);
              }}
            />
            <MdDelete
              className="cursor-pointer text-sm text-red-700 hover:text-red-800"
              onClick={handleRemoveFolder}
            />
          </div>
        )}
      </div>
      {/* ADD FILE */}
      {showAddFileInput && (
        <div className="pl-6 w-full flex items-center gap-2">
          <FaFile className="text-blue-500 text-sm" />
          <input
            type="text"
            ref={fileRef}
            placeholder="Enter file name"
            className="bg-gray-100 border border-gray-300 text-sm my-1 h-6"
            onBlur={() => handleAddFile(folderData.treeId)}
          />
          {/* <button
            onClick={() => handleAddFile(folderData.treeId)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm h-6 rounded-md"
          >
            Add File
          </button>
          <button
            onClick={() => setShowAddFileInput(false)}
            className="text-red-500 hover:text-red-700 text-sm h-6"
          >
            Cancel
          </button> */}
        </div>
      )}
      {/* ADD FOLDER */}
      {showAddFolderInput && (
        <div className="pl-6 w-full flex items-center gap-2">
          <FaFolderOpen className="text-yellow-500 text-sm" />
          <input
            type="text"
            ref={folderRef}
            placeholder="Enter folder name"
            className="bg-gray-100 border border-gray-300 text-sm my-1 h-6"
            onBlur={() => handleAddFolder(folderData.treeId)}
          />
          {/* <button
            onClick={() => handleAddFolder(folderData.treeId)}
            className="bg-green-500 hover:bg-green-600 text-white rounded-md"
          >
            Add Folder
          </button>
          <button
            onClick={() => setShowAddFolderInput(false)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            Cancel
          </button> */}
        </div>
      )}
      {isItemsVisible && <div>{folderData.items?.map(item => <Explorer key={item.treeId} {...item} />)}</div>}
    </div>
  );
};