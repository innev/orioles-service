import prisma from '@/lib/prisma';

export type TApp = {
    name: string
    url: string
    group: string|null
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
            group: true,
            icon: true,
            visiable: true,
            requiresAuth: true
        },
    });
};

export const getGrouApps = async (user: string, group: string, visiable: boolean = true): Promise<Array<TApp>> => { 
    return prisma.app.findMany({
        where: {
            visiable,
            group,
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
            group: true,
            icon: true,
            visiable: true,
            requiresAuth: true
        },
    });
};