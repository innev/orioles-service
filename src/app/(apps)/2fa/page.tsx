import List from "./list";
import { FullContent } from "@/components/layouts/OriolesLayout";

export const metadata = {
    title: 'Authenticator',
}

const AuthenticatorPage = () => {
    return (
        <FullContent paths={[{ name: 'Authenticator' }]}>
            <List />
        </FullContent>
    )
};

export default AuthenticatorPage;