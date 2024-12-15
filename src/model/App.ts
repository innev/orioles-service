import prisma from '@/lib/prisma';

export type TApp = {
    name: string
    url: string
    icon: string
    visiable: boolean
    requiresAuth: boolean
};

export const getApps = async (visiable: boolean = true): Promise<Array<TApp>> => { 
    return prisma.app.findMany({
        where: { visiable },
        select: {
            id: true,
            name: true,
            url: true,
            icon: true,
            visiable: true,
            requiresAuth: true
        },
    });
};