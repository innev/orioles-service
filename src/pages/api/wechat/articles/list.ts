import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
//    const data = await prisma.article.findMany({
//         select: { id: true, title: true, description: true, content: true, series: true, thumbnail: true, medias: true },
//         orderBy: [{ hint: 'asc' }, { usedCount: 'desc' }]
//     });
    res.status(200).json({
        ok: 0,
        data: []    
    });
};