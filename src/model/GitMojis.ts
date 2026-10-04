import prisma from '@/lib/prisma';

export type EmojiProps = {
    name: string,
    code: string,
    emoji: string,
    entity: string,
    description: string,
    semver: string | null,
    color: string
}

export const getGitmojis = async (): Promise<Array<EmojiProps>> => {
    try {
        return await prisma.gitMojis.findMany({
            select: {
                name: true,
                code: true,
                emoji: true,
                entity: true,
                description: true,
                semver: true,
                color: true
            }
        });
    } catch {
        // 数据库不可达（如 docker build 预渲染）时返回空列表兜底，避免构建失败
        return [];
    }
};