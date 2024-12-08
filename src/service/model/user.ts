
import { UserInfo } from '@/components/layouts/OriolesLayout';
import { PrismaClient } from '@prisma/client';

export const getUserInfo = async (email: string = 'zhaozhao200295@gmail.com'): Promise<any | undefined> => {
    const prisma = new PrismaClient();
    return prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
            nickname: true,
            email: true,
            avatar: true,
            bio: true,
            UserBrand: {
                select: {
                    icon: true,
                    url: true
                },
            },
        },
    });
};