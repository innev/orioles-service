import prisma from '@/lib/prisma';
import { Logos } from '@/components/Icons';

type UserBrand = {
    icon: keyof typeof Logos,
    url: string
};
export type UserInfo = {
    id: string,
    name: string,
    nickname: string,
    email: string,
    avatar: string,
    bio: string,
    UserBrand: Array<UserBrand>
};

export const getUserInfo_ = async (email: string = 'zhaozhao200295@gmail.com'): Promise<any> => {
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