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
    return prisma.gitMojis.findMany({
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
};