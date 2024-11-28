import AppNav from "../../components/server/AppNav";
import FullContainer from "../../components/server/Containers";
import List from "./list";

export const metadata = {
    title: 'Authenticator',
}

export default () => {
    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>
            <AppNav paths={[{ name: 'Authenticator' }]} />
            <FullContainer>
                <List />
            </FullContainer>
        </div>
    )
};