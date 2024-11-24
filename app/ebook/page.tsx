import AppNav from "../../components/server/AppNav";
import FullContainer from "../../components/server/Containers";
import List from "./list";

export const metadata = {
    title: '电子课本',
}

export default () => {
    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>
            <AppNav paths={[{ name: '电子课本' }]} />
            <FullContainer>
                <List />
            </FullContainer>
        </div>
    )
};