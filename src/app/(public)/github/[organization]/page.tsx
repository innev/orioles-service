import { Metadata } from "next";
import AppNav from "@/components/server/AppNav";
import FullContainer from "@/components/server/Containers";
import Repos from "./Repos";
import { TParams } from "./type";
import { getGithubColors } from "@/service/model/GithubColor";

const _genTitle = (params: TParams): string => {
    const organization = params.organization.charAt(0).toUpperCase() + params.organization.slice(1);
    return `${organization} Repo`;
};

export const generateMetadata = async ({ params }: { params: TParams }): Promise<Metadata> => {
    return {
        title: _genTitle(params)
    };
};

export default async ({ params } : { params: TParams }) => {
    const colors = await getGithubColors();
    return (
        <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>
            <AppNav paths={[{ name: _genTitle(params) } ]} />
            <FullContainer>
                <Repos colors={colors} organization={params.organization} />
            </FullContainer>
        </div>
    )
};