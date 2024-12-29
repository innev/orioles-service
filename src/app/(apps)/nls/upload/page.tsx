import { FullContent } from "@/components/layouts/OriolesLayout";
import UploadPage from "./UploadPage";
import GroupSider from "@/components/client/GroupSider";

export const metadata = {
    title: '语音上传',
}

export default () => {
    return (
        <FullContent paths={[
                { name: '自然语言处理', url: '/nls' },
                { name: '语音上传' }
            ]}
            Sider={<GroupSider />}
        >
            <UploadPage />
        </FullContent>
    )
};