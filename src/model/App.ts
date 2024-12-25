import prisma from '@/lib/prisma';

export type TApp = {
    name: string
    url: string
    icon: string
    visiable: boolean
    requiresAuth: boolean
};

export const getApps = async (user: string, visiable: boolean = true): Promise<Array<TApp>> => { 
    return prisma.app.findMany({
        where: {
            visiable,
            ...(user ? {
                OR: [
                    { user },
                    { user: null }
                ]
            } : { user: null })
        },
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