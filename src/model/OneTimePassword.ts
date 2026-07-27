import prisma from '@/lib/prisma';

export type TOtp = {
    name: string
    email: string
    otp: string
};

export const getOtps = async (): Promise<Array<TOtp>> => { 
    return prisma.oneTimePassword.findMany({
        select: {
            name: true,
            email: true,
            otp: true
        },
    });
};

export const getOtpByEmail = async (email: string): Promise<TOtp | null> => { 
    // email 无唯一约束，取最新一条，避免 findMany 后取 first 返回任意记录
    return prisma.oneTimePassword.findFirst({
        where: { email },
        orderBy: { createdAt: 'desc' },
        select: {
            name: true,
            email: true,
            otp: true
        },
    });
};
