import { FullContent } from "@/components/layouts/OriolesLayout";
import UploadPage from "./UploadPage";
import GroupSider from "@/components/client/GroupSider";

const links = [
    {
        "name": "TTS",
        "url": "/nls/tts",
        "icon": "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/51/c9/06/51c906bb-afbc-c6fa-d0c3-5a380879a87d/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.jpeg/460x0w.webp",
        "visiable": true,
        "requiresAuth": true
    },
    {
        "name": "ASR",
        "url": "/nls/asr",
        "icon": "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/db/57/20/db572042-e4fc-d7e4-a271-4b2614d5af1a/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/460x0w.webp",
        "visiable": true,
        "requiresAuth": true
    },
    {
        "name": "Upload",
        "url": "/nls/upload",
        "icon": "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/47/36/fa/4736fa6b-22ab-e7ad-e1b3-3d4bb43a2f81/AppIconExplorer-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/460x0w.webp",
        "visiable": true,
        "requiresAuth": true
    }
];

export const metadata = {
    title: '语音上传',
}

export default () => {
    return (
        <FullContent paths={[
                { name: '自然语言处理', url: '/nls' },
                { name: '语音上传' }
            ]}
            Sider={<GroupSider links={links} />}
        >
            <UploadPage />
        </FullContent>
    )
};