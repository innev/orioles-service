import prisma from '@/lib/prisma';

export type TVideo = {
    source: string
    name: string
    cover: string
    url: string
    visiable: boolean
};

export const getVideos = async (visiable: boolean = true): Promise<Array<TVideo>> => {
    return prisma.video.findMany({
        where: { visiable },
        select: {
            source: true,
            name: true,
            cover: true,
            url: true,
            visiable: true
        }
    });
};