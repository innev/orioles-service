import { FullContent } from "@/components/layouts/OriolesLayout";
import GroupSider from "@/components/client/GroupSider";
import GroupApps from "@/components/client/GroupApps";

export const metadata = {
    title: '自然语言处理',
}

const NLSPage = () => {
    return (
        <FullContent
            paths={[{ name: '自然语言处理' }]}
            Sider={<GroupSider />}
        >
            <GroupApps className="" />
        </FullContent>
    )
};

export default NLSPage;