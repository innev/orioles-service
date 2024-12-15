import prisma from '@/lib/prisma';
import { SkillsType } from '@prisma/client';
import { groupBy } from 'lodash';

export type TDockItem = {
    name: string
    icon: string
    url: string
    type: SkillsType
    typeName: string
    requiresAuth?: boolean
};

export const getSkills = async (): Promise<Record<string, Array<TDockItem>>> => {
    return prisma.skills.findMany({
        select: {
            name: true,
            url: true,
            icon: true,
            visiable: true,
            type: true,
            typeName: true
        }
    }).then(data => groupBy(data, 'type'));
};

export const getSkillsByType = async (type: SkillsType): Promise<Array<TDockItem>> => {
    return prisma.skills.findMany({
        where: { type },
        select: {
            name: true,
            url: true,
            icon: true,
            visiable: true,
            type: true,
            typeName: true
        }
    });
};