import alioss from '@/utils/alioss';
import { Metadata } from "next";
import Cover from "./cover";
import Module from "./module";
import Speech from "./speech";
import { ROTER_MAPPING, TParams } from "./type";

export const generateMetadata = async ({ params: { pages } }: { params: TParams }): Promise<Metadata> => {
    const [ id, page ] = pages;
    const prefix: string = alioss.getOSSFolder({ platform: 'orioles', resource: 'ebook' });
    const basePath: string = `${process.env.CDN_HOST}/${prefix}${id}`;
    const { name } = await fetch(`${basePath}/index.json`).then(data => data.json());
    
    return {
        title: `${ROTER_MAPPING[page||'index']} - ${name}`
    };
};

export default async ({ params } : { params: TParams }) => {
    const [ id, page ] = params.pages;

    switch(page) {
        case "speech": return <Speech {...params} goBack={`/ebook/${id}/module`} />;
        case "module": return <Module {...params} goBack={`/ebook/${id}/cover`} />;
        case "cover": return <Cover {...params} goBack={`/ebook`} />;
        default: return <Cover {...params} goBack={`/ebook`} />;
    }
};