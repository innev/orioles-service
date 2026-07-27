import Photos from "./Photos";
import { FullContent } from "@/components/layouts/OriolesLayout";

export const metadata = {
    title: '相册',
}

const PhotoPage = () => {
    return (
        <FullContent paths={[{ name: '相册' }]} >
            <Photos />
        </FullContent>
    )
}

export default PhotoPage;