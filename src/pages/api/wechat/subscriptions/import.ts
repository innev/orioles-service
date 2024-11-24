import { NextApiRequest, NextApiResponse } from 'next';

const _DATA_MOCK_ = [
    {
        "id": "5a5da1e4364d990aacca6848",
        "title": "点亮姐姐带你问名师（二）",
        "abstract": "11",
        "content": "222",
        "update_at": "2018-01-16T14:34:21.037Z",
        "series": "点亮姐姐带你问名师",
        "category": "1"
    },
    {
        "id": "5a5d931b19df8f18e4258665",
        "title": "点亮姐姐带你问名师（一）",
        "abstract": "利用音频，...。",
        "content": "课程详细介绍\n一、产品定位 \n因该产品的呈现形式为音频，适合学生在零碎时间收听，故经综合分析，该产品定位为辅助学生学习的音频节目。学生想提前熟悉课本内...。\nupdate2",
        "update_at": "2018-01-17T06:32:06.180Z",
        "media": [
            {
                "fileName": "copy.avi",
                "src": "/media/201801/5a5c403a9672c41f6cb25bfe/copy.avi"
            },
            {
                "fileName": "Maid with the Flaxen Hair.mp3",
                "src": "/media/201801/5a5c3fb59672c41f6cb25bfd/Maid with the Flaxen Hair.mp3"
            },
            {
                "fileName": "Sleep Away.mp3",
                "src": "/media/201801/5a5dd091c43eba24a857c6af/Sleep Away.mp3"
            },
            {
                "fileName": "卢靖姗 - 曾经心痛 - 副本.mp3",
                "src": "/media/201801/5a5eedd0c7082b1d1876a0f9/卢靖姗 - 曾经心痛 - 副本.mp3",
                "description": "中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌中文歌"
            }
        ],
        "series": "点亮姐姐带你问名师",
        "category": "1"
    }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json({ ok: 0, data: _DATA_MOCK_ });
};