'use client'

import FullContainer from "@/components/server/Containers";
import { useState } from "react";

const baseUrl = 'https://jx.xmflv.com/?url=';

export default () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [iframeUrl, setIframeUrl] = useState(baseUrl);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (videoUrl) {
            setIframeUrl(`${baseUrl}${encodeURIComponent(videoUrl)}`)
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="sm:col-span-2 flex items-center space-x-2">
                <div className="flex-grow">
                    <input
                        type="text"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
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
                <button type="submit" className="bg-purple-600 hover:bg-purple-800 px-6 py-2 text-white rounded-md">01</button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-800 px-6 py-2 text-white rounded-md">02</button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-800 px-6 py-2 text-white rounded-md">03</button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-800 px-6 py-2 text-white rounded-md">04</button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-800 px-6 py-2 text-white rounded-md">05</button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-800 px-6 py-2 text-white rounded-md">06</button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-800 px-6 py-2 text-white rounded-md">07</button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-800 px-6 py-2 text-white rounded-md">08</button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-800 px-6 py-2 text-white rounded-md">09</button>
                <button type="submit" className="bg-purple-600 hover:bg-purple-800 px-6 py-2 text-white rounded-md">10</button>
            </div>

            <FullContainer>
                <iframe src={iframeUrl} className='w-full h-full rounded-lg' allowFullScreen />
            </FullContainer>
        </>
    )
}