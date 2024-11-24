import { ArrowRightOnRectangleIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon, ArrowUturnLeftIcon, PencilSquareIcon, QuestionMarkCircleIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/20/solid';
import React, { MouseEventHandler, useMemo } from 'react';

export default ({ text, iconType, onClick }: { text: string; iconType?: string; onClick?: MouseEventHandler<HTMLButtonElement> }) => {

    const icons = useMemo(() => {
        if (!iconType) return null;

        switch (iconType) {
            case "fanhui": return <ArrowUturnLeftIcon className="h-5 w-5 text-white" />;
            case "yinliangda": return <SpeakerWaveIcon className="h-5 w-5 text-white" />;
            case "jingyin": return <SpeakerXMarkIcon className="h-5 w-5 text-white" />;
            case "yiwen": return <QuestionMarkCircleIcon className="h-5 w-5 text-white" />
            case "bianji": return <PencilSquareIcon className="h-5 w-5 text-white" />
            case "tuichu": return <ArrowRightOnRectangleIcon className="h-5 w-5 text-white" />
            case "quanping": return <ArrowsPointingOutIcon className="h-5 w-5 text-white" />
            case "tuichuquanping": return <ArrowsPointingInIcon className="h-5 w-5 text-white" />
            default: return null;
        }
    }, [iconType]);

    return (
        <div className='relative inline-block py-1'>
            <button
                className='relative bg-black hover:bg-gray-500 text-white cursor-pointer p-2 rounded-full'
                onClick={onClick}
                title={text}
            >
                {icons}
            </button>
        </div>
    )
};