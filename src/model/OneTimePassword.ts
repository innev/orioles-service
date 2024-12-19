import prisma from '@/lib/prisma';
import { first } from 'lodash';

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

export const getOtpByEmail = async (email: string): Promise<TOtp|undefined> => { 
    return prisma.oneTimePassword.findMany({
        where: { email },
        select: {
            name: true,
            email: true,
            otp: true
        },
    }).then(first);
};