import List from "./list";
import { FullContent } from "@/components/layouts/OriolesLayout";

export const metadata = {
    title: 'Authenticator',
}

export default () => {
    return (
        <FullContent paths={[{ name: 'Authenticator' }]}>
            <List />
        </FullContent>
    )
};