import { FullContent } from "@/components/layouts/OriolesLayout";
import ASR from "./ASR";
import GroupSider from "@/components/client/GroupSider";

export const metadata = {
    title: '语音识别',
}

export default () => {
    return (
        <FullContent paths={[
                { name: '自然语言处理', url: '/nls' },
                { name: '语音识别' }
            ]}
            Sider={<GroupSider />}
        >
            <ASR />
        </FullContent>
    )
};