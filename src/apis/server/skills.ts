
import { PrismaClient } from '@prisma/client';
import { groupBy } from 'lodash';
import { TDockItem } from '@/components/client/Dock';

export const getSkills = async (): Promise<Record<string, TDockItem[]> | undefined> => {
    const prisma = new PrismaClient();
    const data: Array<TDockItem> = await prisma.skills.findMany({
        select: {
            name: true,
            url: true,
            icon: true,
            visiable: true,
            type: true,
            typeName: true
        }
    });
    return groupBy(data, 'type');
};