import Link from 'next/link'
import { Fragment } from 'react'
import { ChevronRightIcon } from '@/components/Icons'

export type TAppNav = Array<{
    name: string
    url?: string
}>;

export default ({ paths }: { paths: TAppNav }) => {

    return (
        <div className='bg-white rounded-lg shadow flex flex-row items-center justify-between space-x-2 p-4'>
            <div className='flex flex-row items-center space-x-1'>
                <Link href='/'>
                    <img src='https://d.innev.cn/icons/1.0.0/home.svg' alt="" className='w-6 h-6 cursor-pointer' />
                </Link>
                {
                    paths.map((item, index) => (
                        <Fragment key={index}>
                            <ChevronRightIcon className="fa-solid fa-angle-right text-gray-400" />
                            {
                                !!item.url ? 
                                <Link href={item.url} className="text-sm text-gray-900 cursor-pointer">{item.name}</Link> : 
                                <span className='text-sm text-gray-900'>{item.name}</span>
                            }
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )

}