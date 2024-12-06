import { handleApiError } from '@/utils/api-response'
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

interface App {
    name: string
    url: string
    icon: string
    visiable: boolean,
    requiresAuth?: boolean
};

/**
 * app/api 中的GET方法
 */
export async function GET(_: NextRequest) {
    const prisma = new PrismaClient();

    try {
        const data: Array<App> = await prisma.app.findMany({
            select: {
              name: true,
              url: true,
              icon: true,
              visiable: true,
              requiresAuth: true
            },
            // orderBy: [
            //     { sort: 'asc' }
            // ],
          });
        return NextResponse.json({
            code: 200,
            data,
            mas: '请求成功'
        });

    } catch (error) {
        return NextResponse.json(
            handleApiError(error),
            { status: error instanceof Error ? 404 : 200 }
        )
    }
}