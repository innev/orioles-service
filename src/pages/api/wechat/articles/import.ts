import { NextApiRequest, NextApiResponse } from 'next';

const _DATA_MOCK_ = [
    {
        id: "5a5eee1ac7082b1d1876a0fa",
        title: "test",
        description: "11",
        content: "1111\n\n![u4.png](/media/201801/5a600b738f2bf616d4f1d59b/u4.png \"u4.png\")\n\n",
        series: "点亮姐姐带你问名师1",
        thumbnail: "/media/201801/5a601e4c68547817e04b2ac9/u4.png",
        medias: {
            create: [
                {
                    name: "卢靖姗 - 曾经心痛.mp3",
                    src: "/media/201801/5a5eeb68e73a1910a446ceab/卢靖姗 - 曾经心痛.mp3"
                }
            ]
        },
        category: {
            create: {
                id: 3001,
                name: "同步辅导"
            }
        },
        user: {
            create: {
                id: "cljlkvjy1000juzo9dz6drihh",
                name: "管理员",
                email: "393715354@qq.com",
                image: "/media/201801/5a5d92f119df8f18e4258664/u4.jpg"
            }
        }
    },
    {
        id: "5a5da1e4364d990aacca6848",
        title: "点亮姐姐带你问名师（二）",
        description: "点亮姐姐带你问名师（二）",
        content: "    《点亮姐姐...的魅力。\n",
        thumbnail: "/media/201801/5a5da1e2364d990aacca6847/test.jpg",
        series: "点亮姐姐带你问名师1",
        medias: {
            create: [
                {
                    name: "卢靖姗 - 曾经心痛.mp3",
                    src: "/media/201801/5a5eeb68e73a1910a446ceab/卢靖姗 - 曾经心痛.mp3"
                }
            ]
        },
        category: { connect: { id: 3001 } },
        user: { connect: { id: "cljlkvjy1000juzo9dz6drihh" } }
    },
    {
        id: "5a5d931b19df8f18e4258665",
        title: "点亮姐姐带你问名师（一）",
        description: "利用音频，根据最新修订的新课程标准，与统编版教材内容，对学生进行同步指导的一个音频节目。它能让学生在碎片化时间里通过特级教师的讲解获取书中精粹，帮助学生在日常的学习中抓住重点、完善知识结构，培养学生独立学习、思考的能力。",
        content: "课程详细介绍\n一、产品定位 \n因该。\n```",
        thumbnail: "/media/201801/5a5d92f119df8f18e4258664/u4.jpg",
        series: "点亮姐姐带你问名师",
        medias: {
            create: [
                {
                    name: "copy.avi",
                    src: "/media/201801/5a5c403a9672c41f6cb25bfe/copy.avi"
                },
                {
                    name: "卢靖姗 - 曾经心痛 - 副本.mp3",
                    src: "/media/201801/5a5eedd0c7082b1d1876a0f9/卢靖姗 - 曾经心痛 - 副本.mp3",
                    description: "中文歌中文..."
                }
            ]
        },
        category: { connect: { id: 3001 } },
        user: { connect: { id: "cljlkvjy1000juzo9dz6drihh" } }
    }
];

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // 
    // for(let key in _DATA_MOCK_) {
    //     const article = _DATA_MOCK_[key];
    //     await prisma.article.create({ data: article });
    // }

    res.status(200).json({ ok: 0, data: _DATA_MOCK_.length });
};