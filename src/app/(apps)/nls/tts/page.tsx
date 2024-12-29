import { FullContent } from "@/components/layouts/OriolesLayout";
import TTS from "./TTS";
import GroupSider from "@/components/client/GroupSider";

export const metadata = {
    title: '语音合成',
}

export default () => {
    return (
        <FullContent paths={[
                { name: '自然语言处理', url: '/nls' },
                { name: '语音合成' },
            ]}
            Sider={<GroupSider />}
        >
            <TTS />
        </FullContent>
    )
};