import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest) => {
    const resp = await fetch(`${process.env.PROXY_API}/api/etf`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*'
        }
    })
    const data = await resp.json();
    return NextResponse.json(data);
}