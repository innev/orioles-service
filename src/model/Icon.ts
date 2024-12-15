import prisma from '@/lib/prisma';

export type DevIconProps = {
    name: string
    url?: string
}

export const getIcons = async (): Promise<Array<DevIconProps>> => {
    return prisma.icon.findMany({
        select: {
            name: true
        }
    });
};