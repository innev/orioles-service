'use client';

import GroupApps from "./GroupApps";
import SiderLinks from "./SiderLinks";

export default () => {
    return (
        <div className='flex flex-col gap-4 md:gap-6'>
            <GroupApps />
            <SiderLinks />
        </div>
    );
};