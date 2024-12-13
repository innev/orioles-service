import AppNav from "@/components/server/AppNav";
import VideoPlayer from "./VideoPlayer";

export const metadata = {
  title: 'VIP Video'
}

export default () => {
    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>
            <AppNav paths={[{ name: 'VIP Video' }]} />
            <VideoPlayer />
        </div>
    )
}