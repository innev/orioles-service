import prisma from '@/lib/prisma';
import { assign } from 'lodash';

export type TGithubColor = {
    name: string
    color: string
}

export const getGithubColors = async (): Promise<{ [key: string]: string }> => {
    return prisma.githubColor.findMany({
        select: {
            name: true,
            color: true
        }
    }).then(_c => assign({}, ..._c));
};