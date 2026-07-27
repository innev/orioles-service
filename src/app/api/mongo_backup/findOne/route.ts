import { NextRequest, NextResponse } from "next/server"
import { WebResponse } from "@/utils/web"
import { getToken } from 'next-auth/jwt'

// 允许查询的集合白名单（与前端实际使用的集合保持一致）
const ALLOWED_COLLECTIONS: string[] = ['funds', 'videos', 'photos'];

export async function POST(request: NextRequest) {
    const session = await getToken({ req: request });
    if (!session) {
        return NextResponse.json({ code: 401, data: null, message: '请先登录' }, { status: 401 });
    }

    const body = await request.json()
    // 校验 collection 在白名单内，且 filter 必须是普通对象
    if (!ALLOWED_COLLECTIONS.includes(body?.collection)) {
        return NextResponse.json({ code: 403, data: null, message: '不允许查询的集合' }, { status: 403 });
    }
    if (body.filter !== undefined && (typeof body.filter !== 'object' || body.filter === null || Array.isArray(body.filter))) {
        return NextResponse.json({ code: 400, data: null, message: 'filter 必须是普通对象' }, { status: 400 });
    }

    const resp = await fetch(`${process.env.MONGODB_API}/action/findOne`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': process.env.MONGODB_API_KEY || '',
        },
        body: JSON.stringify({
            dataSource: process.env.MONGODB_DATASOURCE,
            ...body,
        })
    })
    const data = await resp.json()
    return NextResponse.json(WebResponse.successList(data.documents, data.documents.length >= body.limit))
}