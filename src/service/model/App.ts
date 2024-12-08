
import { PrismaClient } from '@prisma/client';

export type TApp = {
    name: string
    url: string
    icon: string
    visiable: boolean,
    requiresAuth: boolean
};

export const getApps = async (visiable: boolean = true): Promise<Array<TApp>> => {
    const prisma = new PrismaClient();    
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