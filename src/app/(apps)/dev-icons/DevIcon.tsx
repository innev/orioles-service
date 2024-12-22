'use client';

import toast from "react-hot-toast";
import { ImageSkeleton } from "@/components/iv-ui";
import { DevIconProps } from '@/model/Icon';
import useSWR from 'swr';
import { ICON_SERVICE } from '@/service';
import http from '@/utils/http';
import { Loading } from '@/components/Icons'
import CDN from '@/utils/cdn';;

const copyName = (text: string) => {
    navigator.clipboard.writeText(text)
    toast(`已复制！`, { position: 'top-right', icon: <code className="px-2 py-1 text-xs bg-gray-100 text-red-500 rounded-md">{text}</code> })
}

export const DevIcon =  ({ icon }: { icon: DevIconProps }) => {
    return (
        <div
            className="icon-card"
            onClick={() => copyName(icon.name.toLowerCase())}
        >
            <ImageSkeleton src={CDN.icon(icon.name)} />
            <p className="text-sm">{icon.name}</p>
        </div>
    )
}

export default () => {
    const { data: icons = [], error, isLoading } = useSWR<DevIconProps[]>(ICON_SERVICE.ICONS, http.find_);

    return (
        <div className="flex flex-row flex-wrap gap-2">
            {
                isLoading
                    ? <div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>
                    : icons.map((item: DevIconProps) => <DevIcon key={item.name} icon={item} />)
            }
        </div>
    );
}