import { cache } from 'react';
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

// 用 React cache 包装，消除同一请求内 layout 与 page 的重复查询
export const getUserInfo_ = cache(async (email: string = process.env.DEFAULT_USER_EMAIL || 'zhaozhao200295@gmail.com'): Promise<any> => {
    try {
        return await prisma.user.findUnique({
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
    } catch {
        // 数据库不可达（如 docker build 期间无库可连）时返回 null 兜底，
        // 否则会打断所有页面的静态预渲染导致构建失败；调用方已判空
        return null;
    }
});

export const userLogin = async ({ email, password }: { email: string, password: string }): Promise<any> => {
    if (!email || !password) return null;

    // 注意：name 无唯一约束，findFirst + OR 可能匹配到非预期用户（保留原有逻辑避免破坏登录）
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