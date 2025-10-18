'use client'

import { Loading } from "@/components/Icons";
import FullContainer from "@/components/server/Containers";
import { TVideo } from "@/model/Video";
import { VIDEO_SERVICE } from "@/service";
import http from "@/utils/http";
import { useState } from "react";
import useSWR from "swr";

const baseUrl = 'https://jx.xmflv.com/?url=';

export default () => {
    const [videoUrl, setVideoUrl] = useState('');
    const { data = [], error, isLoading } = useSWR<TVideo[]>(VIDEO_SERVICE.VIDEOS, http.find_);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const inputElement: HTMLInputElement = document.getElementById('videoUrl') as HTMLInputElement;
        setVideoUrl(inputElement.value);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="sm:col-span-2 flex items-center space-x-2">
                <div className="flex-grow">
                    <input
                        id="videoUrl"
                        type="text"
                        placeholder="请输入视频地址"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-800 px-6 py-2 text-white rounded-md"
                >
                    提交
                </button>
            </form>


            <div className="grid gap-x-8 gap-y-4 grid-cols-5">
                {
                    isLoading
                    ? <div className="my-8 mx-auto col-span-full"><Loading className='h-20 w-20' /></div>
                    : data.map(video => <button type="submit" className="bg-purple-600 hover:bg-purple-800 px-6 py-2 text-white rounded-md" onClick={() => setVideoUrl(video.url)} >{video.name}</button>)
                }
            </div>

            <FullContainer>
                <iframe src={`${baseUrl}${encodeURIComponent(videoUrl)}`} className='w-full h-full rounded-lg' allowFullScreen />
            </FullContainer>
        </>
    )
}