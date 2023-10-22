import { NextRequest, NextResponse } from "next/server";
import { WebResponse } from "../../../../utils/web";

export async function POST(request: NextRequest) {
    const body = await request.json()
    // const resp = await fetch(`${process.env.MONGODB_API}/action/find`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Request-Headers': '*',
    //         'api-key': process.env.MONGODB_API_KEY || '',
    //     },
    //     body: JSON.stringify({
    //         dataSource: process.env.MONGODB_DATASOURCE,
    //         ...body,
    //     })
    // })
    console.log("body:", body);
    const resp = await fetch(`https://anoyi.com/mongo/find`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        },
        body: JSON.stringify(body)
    })
    const data = await resp.json()
    console.log("data:", data);
    return NextResponse.json(WebResponse.successList(data.documents, data.documents.length >= body.limit))
}