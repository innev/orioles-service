import prisma from '@/lib/prisma';

export type TGithubColor = {
    name: string
    color: string
}

export const getGithubColors = async (): Promise<{ [key: string]: string }> => {
    // 返回 { [语言名]: 颜色值 } 的映射
    return prisma.githubColor.findMany({
        select: {
            name: true,
            color: true
        }
    }).then(list => Object.fromEntries(list.map(({ name, color }) => [name, color])));
};