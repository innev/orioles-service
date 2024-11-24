export interface DMedia {
    name: string,
    src: string
};

export interface DCategory {
    id?: number,
    name: string
};

export default interface DArticle {
    id?: string,
    title: string
    description: string,
    content: string,
    thumbnail: string,
    series: string,
    medias: DMedia,
    category: DCategory | number,
    user: string
}