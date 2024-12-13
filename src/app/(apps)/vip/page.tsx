import VideoPlayer from "./VideoPlayer";
import { FullContent } from "@/components/layouts/OriolesLayout";

export const metadata = {
    title: 'VIP Video'
}

export default () => {
  return (
    <FullContent paths={[{ name: 'VIP Video' }]} >
      <VideoPlayer />
    </FullContent>
  )
}