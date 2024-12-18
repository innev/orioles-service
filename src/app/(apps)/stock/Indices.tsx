'use client'

import Link from 'next/link'
import useSWR from 'swr'
import http from '@/utils/http'
import { TRealData } from './type'
import NumberFlow from '@number-flow/react'
import { NumberFlowFormat, StockFormat } from '@/utils/format'

export default ({ refreshInterval = 5000 }) => {

    const code = [
        '000001.SS',
        '399001.SZ',
        '399006.SZ',
        '000688.SS',
        '399330.SZ',
        '000300.SS',
        '000905.SS',
        '000852.SS',

        '603617.SS',
        '603679.SS',
        '603687.SS',
        '300940.SZ',
        '002515.SZ',
        '002006.SZ'
    ]

    const fields = [
        'prod_code',
        'prod_name',
        'price_precision',
        'update_time',
        'last_px',
        'px_change',
        'px_change_rate',
        'trade_status'
    ]

    const { isLoading, data: realResp } = useSWR<TRealData>(`https://api-ddc.wallstcn.com/market/real?prod_code=${code.join(',')}&fields=${fields.join(',')}`, http.getAll, { refreshInterval })

    if (isLoading || !realResp) {
        return (
            <div className="grid grid-cols-6 gap-4 w-full">
                {
                    [...Array.from(Array(6).keys())].map(i => <div key={i} className="rounded-lg w-full shadow h-28 bg-white" />)
                }
            </div>
        )
    }

    const getTextColor = (num: number) => {
        if (num > 0) return 'text-red-600'
        if (num == 0) return 'text-gray-600'
        return 'text-green-600'
    }

    return (
        <div className="grid grid-cols-8 gap-4 w-full text-white">
            {
                code.map((item) => {
                    if (Object.keys(realResp.data.snapshot).length > 0) {
                        const stock = realResp.data.snapshot[item]
                        const stockObj = Object.fromEntries(realResp.data.fields.map((_, i) => [realResp.data.fields[i], stock?.[i]]))
                        return (
                            <Link href={`/stock/${item}`} key={stockObj['prod_code']}>
                                <div className={`cursor-pointer rounded-lg w-full flex flex-col shadow gap-1 py-4 justify-center items-center bg-white ${getTextColor(stockObj['px_change'] as number)}`}>
                                    <span className='text-sm'>{stockObj['prod_name']}</span>
                                    <NumberFlow className='text-3xl font-semibold' value={stockObj['last_px'] as number} format={NumberFlowFormat.value} />
                                    <div className='flex flex-row gap-2 text-sm'>
                                        <span>{StockFormat.trend(stockObj['px_change'] as number)}</span>
                                        <span>{StockFormat.rate(stockObj['px_change_rate'] as number / 100)}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                })
            }
        </div>
    )
}