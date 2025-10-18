import prisma from '@/lib/prisma';
import { DeviceService } from '@prisma/client';

export type TDevice = {
    code: string
    name: String
    services: DeviceService[]

};

export const getDevices = async (): Promise<Array<TDevice>> => {
    return prisma.device.findMany({
        select: {
            code: true,
            name: true,
            services: true
        },
    });
};