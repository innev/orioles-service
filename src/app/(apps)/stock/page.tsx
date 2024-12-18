import AppNav from "@/components/server/AppNav";
import Indices from "./Indices";
import { XuangubaoLives, WallstcnLives } from "./Lives";
import { XuangubaoPlates, QQPlates } from "./Plates";

export const metadata = {
    title: '股市',
}

export default () => {
    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>
            <AppNav paths={[{ name: '股市' }]} />
            <Indices />

            <div className="w-full flex flex-1 gap-4 md:gap-6">
                <div className="flex-1-col box-card">
                    <WallstcnLives />
                </div>

                <div className="flex-1-col box-card">
                    <XuangubaoLives />
                </div>

                <div className="w-96 flex flex-0 flex-col gap-4">
                    <div className="box-card p-4">
                        <div className="mb-2">
                            行业板块
                            <i className="fa-solid fa-arrow-trend-up text-red-500 ml-2"></i>
                        </div>
                        <QQPlates />
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="mb-2">
                            板块涨幅榜
                            <i className="fa-solid fa-arrow-trend-up text-red-500 ml-2"></i>
                        </div>
                        <XuangubaoPlates is_acs={true} limit={9} />
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="mb-2">
                            板块跌幅榜
                            <i className="fa-solid fa-arrow-trend-down text-green-500 ml-2"></i>
                        </div>
                        <XuangubaoPlates is_acs={false} limit={9} />
                    </div>

                    
                </div>
            </div>
        </div>
    )
};