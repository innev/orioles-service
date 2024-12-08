import { PrismaClient } from '@prisma/client';
import { assign } from 'lodash';

export type TGithubColor = {
    name: string
    color: string
}

export const getGithubColors = async (): Promise<{ [key: string]: string }> => {
    const prisma = new PrismaClient();
    
    return prisma.githubColor.findMany({
        select: {
            name: true,
            color: true
        }
    }).then(_c => assign({}, ..._c));
};