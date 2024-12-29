'use client';

import { TApp } from "@/model/App";
import IconButton from "@/components/client/IconButton";
import useSWR from "swr";
import { APP_SERVICE } from "@/service";
import http from "@/utils/http";

export default ({ className = 'content-opacity md:w-80', links = [] }: { className?: string, links?: TApp[] }) => {
    const { data = links, error, isLoading } = useSWR<TApp[]>(`${APP_SERVICE.GROUP_APPS}/nls`, http.find_);

    return (
        <div className={`${className} rounded-lg w-full flex flex-row flex-wrap items-center justify-start gap-6 p-6`}>
            {isLoading || data.map((app: TApp, index: number) => app.visiable === true && <IconButton item={app} key={index} />)}
        </div>
    );
};