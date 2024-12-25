import prisma from '@/lib/prisma';
import { Logos } from '@/components/Icons';
import { compare, hashPassword } from '@/lib/hashPassword';

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

export const userLogin = async ({ email, password }: { email: string, password: string }): Promise<any> => {
    if (!email || !password) return null;

    const userInfo = await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { name: email }
            ]
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            passwordSalt: true
        }
    });

    if (!userInfo || !userInfo?.password || !userInfo?.passwordSalt) return null;
    if (!compare(password, userInfo)) return null;
    
    return {
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email
    }
};