'use client';

import { EXPLORER_SERVICE } from "@/service";
import Explorer from "./Explorer";
import http from "@/utils/http";
import useSWR from "swr";
import { TExplorerItem } from "@/model/Explorer";

export default () => {
  const { data = [], error, isLoading } = useSWR<TExplorerItem[]>(EXPLORER_SERVICE.QINIU, http.find_);
  return (
    <div className="content-opacity flex flex-col items-start rounded-lg w-full md:w-80 h-[calc(100vh-145px)] overflow-y-auto p-4">
      {data.map(item => <Explorer {...item} key={item.treeId} />)}
    </div>
  );
};