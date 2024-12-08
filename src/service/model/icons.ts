import { PrismaClient } from '@prisma/client';

export type DevIconProps = {
    name: string
    url?: string
}

export const getIcons = async (): Promise<Array<DevIconProps>> => {
    const prisma = new PrismaClient();
    
    return prisma.icon.findMany({
        select: {
            name: true
        }
    });
};