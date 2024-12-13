import { Metadata } from "next";
import Repos from "./Repos";
import { TParams } from "./type";
import { getGithubColors } from "@/model/GithubColor";
import { FullContent } from "@/components/layouts/OriolesLayout";

const _genTitle = (params: TParams): string => {
    const organization = params.organization.charAt(0).toUpperCase() + params.organization.slice(1);
    return `${organization} Repo`;
};

export const generateMetadata = async ({ params }: { params: TParams }): Promise<Metadata> => {
    return {
        title: _genTitle(params)
    };
};

export default async ({ params }: { params: TParams }) => {
    const colors = await getGithubColors();
    
    return (
        <FullContent paths={[{ name: _genTitle(params) }]}>
            <Repos colors={colors} organization={params.organization} />
        </FullContent>
    )
};