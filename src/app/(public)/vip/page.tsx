import AppNav from "@/components/server/AppNav";
import VideoPlayer from "./VideoPlayer";

export const metadata = {
    title: 'VIP Video'
}

export default () => {
    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>
            <AppNav paths={[{ name: 'VIP Video' }]} />

            {/* https://www.iqiyi.com/v_19rrjaains.html?eventId=9e17f35c378fbbf5ce0fc4d9ef240eff&bstp=3&r_originl=2&e=9e17f35c378fbbf5ce0fc4d9ef240eff&stype=2&bkt=9185_A,9184_A,9391_A,9387_A&rseat=5&r_area=channel_falls&ht=0&c1=2&r_source=54&recArea=channel_falls&vfrmrst=5&bucket=9185_A,9184_A,9391_A,9387_A&vfrmblk=pca_2_waterfall&r=101738201&event_id=9e17f35c378fbbf5ce0fc4d9ef240eff&rank=5&block=pca_2_waterfall&rpage=pcw_dianshiju&position=4&vfrm=pcw_dianshiju */}
            <VideoPlayer />
            {/* <div className="sm:col-span-2 flex items-center space-x-2">
                <div className="flex-grow">
                    <input
                        type="text"
                        className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    />
                </div>

                <button className="bg-purple-600 hover:bg-purple-800 px-6 py-2 text-white rounded-md">提交</button>
            </div> */}
        </div>
    )
}