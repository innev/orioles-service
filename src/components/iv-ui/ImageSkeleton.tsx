'use client'

import { useState } from "react";

type ImageSkeletonProps = {
    className?: string
    src: string
}

export default function ImageSkeleton({ className = "icon-image", src }: ImageSkeletonProps) {
    const [loading, setLoading] = useState(true);

    // 直接渲染 <img>（loading="lazy"），不再用 new Image() 预加载，避免同一图片两次请求；
    // 加载完成前用骨架屏占位
    return (
        <>
            {loading && <div className={`${className} animate-pulse bg-gray-200`}></div>}
            <img
                className={`${className} ${loading ? 'hidden' : ''}`}
                src={src}
                alt=""
                loading="lazy"
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
            />
        </>
    );
}
