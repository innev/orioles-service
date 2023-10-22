import { readFileSync } from "fs"
import path from "path"
import AppNav from "../../../components/server/AppNav"
import FullContainer from "../../../components/server/Containers"
import Repos from "./Repos"

export const metadata = {
    title: 'Organization',
}

const _firstUp = (input: string): string => {
    return input.charAt(0).toUpperCase() + input.slice(1);
};

export default function Page({ params }: { params: { organization: string } }) {

    const colors = JSON.parse(readFileSync(path.join(process.cwd(), 'data/json/github-colors.json'), 'utf-8'))

    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

            <AppNav paths={[{ name: `${_firstUp(params.organization)} Repo` }]} />

            <FullContainer>
                <Repos colors={colors} organization={params.organization} />
            </FullContainer>

        </div>
    )

}
